import { IonButton, IonSpinner } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useDevice } from '../hooks/useDevice';

const DevicePage = () => {
  const { battery, info, deviceId, loading, error, refresh } = useDevice();

  return (
    <SensorPage title="Device">
      {loading && <IonSpinner name="crescent" />}
      <ErrorText error={error} />

      {!loading && battery && (
        <>
          <h3>Batería</h3>
          <p>Nivel: {battery.batteryLevel !== undefined ? Math.round(battery.batteryLevel * 100) + '%' : 'No disponible'}</p>
          <p>{battery.isCharging ? 'Cargando' : 'No cargando'}</p>
        </>
      )}

      {!loading && info && (
        <>
          <h3>Dispositivo</h3>
          <p>Modelo: {info.model}</p>
          <p>Fabricante: {info.manufacturer}</p>
          <p>Plataforma: {info.platform}</p>
          <p>Sistema operativo: {info.operatingSystem} {info.osVersion}</p>
          <p>Es virtual: {info.isVirtual ? 'Sí' : 'No'}</p>
          <p style={{ wordBreak: 'break-all' }}>ID: {deviceId}</p>
        </>
      )}

      <IonButton expand="block" onClick={refresh}>Actualizar</IonButton>
    </SensorPage>
  );
};

export default DevicePage;
