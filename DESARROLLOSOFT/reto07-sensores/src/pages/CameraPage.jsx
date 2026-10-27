import { IonButton } from '@ionic/react';
import { SensorPage, ErrorText } from '../components/SensorPage';
import { useCamera } from '../hooks/useCamera';

const CameraPage = () => {
  const { photo, error, takePhoto } = useCamera();

  return (
    <SensorPage title="Camera">
      <IonButton expand="block" onClick={takePhoto}>Tomar foto</IonButton>
      <ErrorText error={error} />
      {photo && <img src={photo} alt="foto" style={{ width: '100%', borderRadius: 8 }} />}
    </SensorPage>
  );
};

export default CameraPage;
