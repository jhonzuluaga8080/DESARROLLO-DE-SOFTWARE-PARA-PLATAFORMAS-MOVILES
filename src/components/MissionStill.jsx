import { useState } from 'react';
import { IonButton, IonProgressBar, IonText } from '@ionic/react';
import { Haptics } from '@capacitor/haptics';
import { MissionCard } from './MissionCard';
import { useApp, MISIONES } from '../context/AppContext';
import { useStillness } from '../hooks/useStillness';

const SEGUNDOS = 10;

export const MissionStill = () => {
  const { isCompleted, completeMission } = useApp();
  const completed = isCompleted(3);
  const locked = !isCompleted(2); // se habilita al terminar la misión 2
  const [error, setError] = useState('');

  const { active, elapsed, start } = useStillness({
    seconds: SEGUNDOS,
    onDone: async () => {
      try {
        await Haptics.vibrate({ duration: 1000 }); // vibra pasados los 10 s
      } catch (e) {
        console.log('Vibración no disponible');
      }
      completeMission(3);
    },
  });

  const handleIniciar = async () => {
    try {
      setError('');
      await start();
    } catch (e) {
      setError('No se pudo acceder al acelerómetro.');
    }
  };

  const estado = completed ? 'completada' : locked ? 'bloqueada' : 'pendiente';
  const m = MISIONES[2];
  return (
    <MissionCard {...m} estado={estado}>
      <IonButton disabled={completed || locked || active} onClick={handleIniciar}>
        {active ? 'No te muevas...' : 'Iniciar'}
      </IonButton>
      {active && (
        <>
          <IonProgressBar value={elapsed / SEGUNDOS} />
          <p>Quieto: {elapsed.toFixed(1)} / {SEGUNDOS} s (si te mueves, se reinicia)</p>
        </>
      )}
      {error && <IonText color="danger"><p>{error}</p></IonText>}
    </MissionCard>
  );
};
