import { LocalNotifications } from '@capacitor/local-notifications';

export const useNotifications = () => {
  const requestPermission = async () => {
    try {
      await LocalNotifications.requestPermissions();
    } catch (e) {
      console.log('Permiso de notificaciones no disponible', e);
    }
  };

  // delaySeconds permite que dos notificaciones seguidas no se pisen
  const notify = async (body, delaySeconds = 0) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 1000000),
            title: 'Misiones',
            body,
            schedule: { at: new Date(Date.now() + 300 + delaySeconds * 1000) },
          },
        ],
      });
    } catch (e) {
      console.log('No se pudo enviar la notificación', e);
    }
  };

  return { requestPermission, notify };
};
