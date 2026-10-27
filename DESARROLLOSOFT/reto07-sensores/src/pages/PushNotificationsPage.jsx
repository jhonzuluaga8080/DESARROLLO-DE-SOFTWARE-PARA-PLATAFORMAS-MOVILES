import { IonButton, IonText } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { usePushNotifications } from '../hooks/usePushNotifications';

const PushNotificationsPage = () => {
  const { token, notification, error, requestPermission } = usePushNotifications();

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(token);
    } catch (e) {
      console.log('No se pudo copiar', e);
    }
  };

  return (
    <SensorPage title="Push Notifications">
      <IonText color="medium">
        <p>Solo funciona en un dispositivo real con Firebase (google-services.json). Copia el token y pégalo en Firebase → Messaging → "Enviar mensaje de prueba".</p>
      </IonText>

      <IonButton expand="block" onClick={requestPermission}>Activar Push</IonButton>
      <ErrorText error={error} />

      {token && (
        <>
          <p style={{ wordBreak: 'break-all' }}>Token: {token}</p>
          <IonButton expand="block" fill="outline" onClick={copiar}>Copiar token</IonButton>
        </>
      )}

      {notification && (
        <p>
          <b>Notificación recibida:</b> {notification.title} — {notification.body}
        </p>
      )}
    </SensorPage>
  );
};

export default PushNotificationsPage;
