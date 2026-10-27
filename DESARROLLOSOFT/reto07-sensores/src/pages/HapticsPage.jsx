import { IonButton, IonText } from '@ionic/react';
import { SensorPage } from '../components/SensorPage';
import { useHaptics } from '../hooks/useHaptics';

const HapticsPage = () => {
  const { impact, notify, vibrate, selectionStart, selectionChanged, selectionEnd } = useHaptics();

  return (
    <SensorPage title="Haptics">
      <IonText color="medium">
        <p>Si el celular no tiene vibrador, los botones no hacen nada.</p>
      </IonText>

      <IonButton expand="block" onClick={() => impact('light')}>Impacto suave</IonButton>
      <IonButton expand="block" onClick={() => impact('medium')}>Impacto medio</IonButton>
      <IonButton expand="block" onClick={() => impact('heavy')}>Impacto fuerte</IonButton>

      <IonButton expand="block" color="success" onClick={() => notify('success')}>Éxito</IonButton>
      <IonButton expand="block" color="warning" onClick={() => notify('warning')}>Advertencia</IonButton>
      <IonButton expand="block" color="danger" onClick={() => notify('error')}>Error</IonButton>

      <IonButton expand="block" fill="outline" onClick={() => vibrate(200)}>Vibrar 200 ms</IonButton>
      <IonButton expand="block" fill="outline" onClick={() => vibrate(1000)}>Vibrar 1 segundo</IonButton>

      <IonButton expand="block" fill="outline" color="medium" onClick={async () => {
        await selectionStart();
        await selectionChanged();
        await selectionEnd();
      }}>
        Selección (start → changed → end)
      </IonButton>
    </SensorPage>
  );
};

export default HapticsPage;
