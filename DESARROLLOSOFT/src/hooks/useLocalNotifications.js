import { useEffect, useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

// El id de una notificación debe ser un entero pequeño (32 bits)
const nuevoId = () => Math.floor(Math.random() * 1000000) + 1;

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState(null);
  const [error, setError] = useState(null);
  const [lastTapped, setLastTapped] = useState(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === 'granted';
    } catch (err) {
      setError(err.message || String(err));
      return false;
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  // Notificación inmediata (sin "schedule")
  const sendNotification = async ({ id = nuevoId(), title = 'Notificación', body = 'Mensaje' } = {}) => {
    try {
      setError(null);
      await LocalNotifications.schedule({ notifications: [{ id, title, body }] });
      return id;
    } catch (err) {
      setError(err.message || String(err));
      return null;
    }
  };

  // Notificación programada para dentro de X segundos
  const scheduleNotification = async ({
    id = nuevoId(),
    title = 'Recordatorio',
    body = 'Tienes algo pendiente',
    seconds = 5,
  } = {}) => {
    try {
      setError(null);
      await LocalNotifications.schedule({
        notifications: [{ id, title, body, schedule: { at: new Date(Date.now() + seconds * 1000) } }],
      });
      return id;
    } catch (err) {
      setError(err.message || String(err));
      return null;
    }
  };

  const cancelNotification = async (id) => {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  // Escucha cuando el usuario toca una notificación
  useEffect(() => {
    let handle = null;
    let cancelled = false;
    LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      setLastTapped(action.notification);
    })
      .then((h) => {
        if (cancelled) h.remove();
        else handle = h;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      handle?.remove();
    };
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission, error, lastTapped,
    requestPermission, checkPermission,
    sendNotification, scheduleNotification, cancelNotification,
  };
};
