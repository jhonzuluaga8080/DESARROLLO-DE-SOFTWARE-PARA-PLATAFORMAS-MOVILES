import { IonButton, IonBadge } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useAccelerometer } from '../hooks/useAccelerometer';

const AccelerometerPage = () => {
  const { acceleration, orientation, magnitude, isShaking, isMoving, error, start, stop } = useAccelerometer({ threshold: 18 });

  return (
    <SensorPage title="Motion (Acelerómetro)">
      <ErrorText error={error} />

      <h3>Aceleración</h3>
      <p>X: {acceleration.x.toFixed(2)}</p>
      <p>Y: {acceleration.y.toFixed(2)}</p>
      <p>Z: {acceleration.z.toFixed(2)}</p>
      <p>Magnitud: {magnitude.toFixed(2)}</p>
      <p>
        Movimiento: <IonBadge color={isMoving ? 'success' : 'medium'}>{isMoving ? 'Sí' : 'No'}</IonBadge>
      </p>
      {isShaking && <h1>¡SHAKE DETECTADO!</h1>}

      <h3>Orientación</h3>
      <p>Alpha (brújula): {orientation.alpha.toFixed(1)}°</p>
      <p>Beta: {orientation.beta.toFixed(1)}°</p>
      <p>Gamma: {orientation.gamma.toFixed(1)}°</p>

      <IonButton expand="block" onClick={start}>Iniciar sensor</IonButton>
      <IonButton expand="block" color="danger" onClick={stop}>Detener sensor</IonButton>
    </SensorPage>
  );
};

export default AccelerometerPage;
