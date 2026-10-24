import { useState } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { MissionCard } from './MissionCard';
import { useApp, MISIONES } from '../context/AppContext';
import { useMovement } from '../hooks/useMovement';

const META_METROS = 50; // cámbialo aquí si el profesor pide otra distancia (el enunciado menciona 50 y 30)

export const MissionMove = () => {
  const { isCompleted, completeMission } = useApp();
  const completed = isCompleted(2);
  const [error, setError] = useState('');

  const { distance, tracking, start, simulateStep } = useMovement({
    target: META_METROS,
    onReached: () => completeMission(2),
  });

  const handleIniciar = async () => {
    try {
      setError('');
      await start();
    } catch (e) {
      setError('Activa el GPS y acepta el permiso de ubicación.');
    }
  };

  const m = MISIONES[1];
  return (
    <MissionCard {...m} estado={completed ? 'completada' : 'pendiente'}>
      <IonButton disabled={completed || tracking} onClick={handleIniciar}>
        {tracking ? 'Camina...' : 'Iniciar'}
      </IonButton>
      {tracking && (
        <div style={{ marginTop: 8 }}>
          <p>Distancia: {distance.toFixed(1)} / {META_METROS} m</p>
          <IonButton size="small" fill="outline" color="secondary" onClick={() => simulateStep(25)}>
            Simular paso (+25m)
          </IonButton>
        </div>
      )}
      {error && <IonText color="danger"><p>{error}</p></IonText>}
    </MissionCard>
  );
};

