import { useState } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { MissionCard } from './MissionCard';
import { useApp, MISIONES } from '../context/AppContext';
import { useCamera } from '../hooks/useCamera';

export const MissionPhoto = () => {
  const { user, isCompleted, completeMission } = useApp();
  const { takePhoto } = useCamera();
  const completed = isCompleted(1);
  const [foto, setFoto] = useState(localStorage.getItem(`foto_${user.uid}`));
  const [error, setError] = useState('');

  const handleTomarFoto = async () => {
    try {
      setError('');
      const dataUrl = await takePhoto();
      localStorage.setItem(`foto_${user.uid}`, dataUrl); // guardar imagen
      setFoto(dataUrl);
      await completeMission(1); // se completa al guardar la imagen
    } catch (e) {
      setError('No se pudo tomar o guardar la foto.');
    }
  };

  const m = MISIONES[0];
  return (
    <MissionCard {...m} estado={completed ? 'completada' : 'pendiente'}>
      <IonButton disabled={completed} onClick={handleTomarFoto}>
        Tomar foto
      </IonButton>
      {error && <IonText color="danger"><p>{error}</p></IonText>}
      {foto && <img src={foto} alt="evidencia" style={{ width: 160, display: 'block' }} />}
    </MissionCard>
  );
};
