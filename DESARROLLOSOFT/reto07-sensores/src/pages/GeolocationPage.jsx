import { IonButton } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useGeolocation } from '../hooks/useGeolocation';

const fmt = (n, d = 6) => (n === null || n === undefined ? '—' : Number(n).toFixed(d));

const GeolocationPage = () => {
  const { position, error, tracking, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <SensorPage title="Geolocation">
      <IonButton expand="block" onClick={getCurrentLocation}>Obtener ubicación actual</IonButton>
      <IonButton expand="block" color="success" disabled={tracking} onClick={startTracking}>Iniciar seguimiento</IonButton>
      <IonButton expand="block" color="danger" disabled={!tracking} onClick={stopTracking}>Detener seguimiento</IonButton>

      <ErrorText error={error} />

      {position && (
        <>
          <p>Latitud: {fmt(position.latitude)}</p>
          <p>Longitud: {fmt(position.longitude)}</p>
          <p>Precisión: {fmt(position.accuracy, 1)} m</p>
          <p>Altitud: {fmt(position.altitude, 1)} m</p>
          <p>Velocidad: {fmt(position.speed, 1)} m/s</p>
          <p>Rumbo: {fmt(position.heading, 0)}°</p>
        </>
      )}
    </SensorPage>
  );
};

export default GeolocationPage;
