import { useState } from 'react';
import { IonButton, IonBadge } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useLocalNotifications } from '../hooks/useLocalNotifications';

const LocalNotificationsPage = () => {
  const {
    permission, error, lastTapped,
    requestPermission, sendNotification, scheduleNotification, cancelNotification,
  } = useLocalNotifications();
  const [programada, setProgramada] = useState(null);

  const onSchedule = async () => {
    const id = await scheduleNotification({ title: 'Recordatorio', body: 'Han pasado 5 segundos', seconds: 5 });
    setProgramada(id);
  };

  const onCancel = async () => {
    if (programada) await cancelNotification(programada);
    setProgramada(null);
  };

  return (
    <SensorPage title="Local Notifications">
      <p>
        Permiso:{' '}
        <IonBadge color={permission === 'granted' ? 'success' : 'warning'}>{permission ?? '...'}</IonBadge>
      </p>

      <IonButton expand="block" onClick={requestPermission}>Pedir permisos</IonButton>
      <IonButton expand="block" onClick={() => sendNotification({ title: 'Hola tú', body: 'Notificación inmediata' })}>
        Enviar ahora
      </IonButton>
      <IonButton expand="block" onClick={onSchedule}>Programar (en 5 segundos)</IonButton>
      <IonButton expand="block" color="danger" disabled={!programada} onClick={onCancel}>
        Cancelar la programada
      </IonButton>

      <ErrorText error={error} />
      {lastTapped && <p>Última notificación tocada: {lastTapped.title} — {lastTapped.body}</p>}
    </SensorPage>
  );
};

export default LocalNotificationsPage;
