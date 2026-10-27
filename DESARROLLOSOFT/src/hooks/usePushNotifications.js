import { useEffect, useState } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';

export const usePushNotifications = () => {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  // 1) pide permiso  2) si lo dan, se registra con Firebase (FCM) y llega el token
  const requestPermission = async () => {
    try {
      setError(null);
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
      } else {
        setError('Permiso de notificaciones denegado');
      }
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  useEffect(() => {
    let handles = [];
    let cancelled = false;

    const agregarListeners = async () => {
      try {
        const hs = await Promise.all([
          PushNotifications.addListener('registration', (t) => setToken(t.value)),
          PushNotifications.addListener('registrationError', (err) => setError(err.error || JSON.stringify(err))),
          // llega con la app abierta
          PushNotifications.addListener('pushNotificationReceived', (n) => setNotification(n)),
          // el usuario tocó la notificación
          PushNotifications.addListener('pushNotificationActionPerformed', (action) => setNotification(action.notification)),
        ]);
        if (cancelled) hs.forEach((h) => h.remove());
        else handles = hs;
      } catch (err) {
        // en web las push nativas no existen
        setError('Las notificaciones push solo funcionan en un dispositivo Android/iOS (no en el navegador).');
      }
    };

    agregarListeners();
    return () => {
      cancelled = true;
      handles.forEach((h) => h.remove());
    };
  }, []);

  return { token, notification, error, requestPermission };
};
