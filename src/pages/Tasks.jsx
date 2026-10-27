import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel,
  IonCheckbox, IonSpinner, IonText,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import useRealTimeCollection from '../hooks/useRealTimeCollection';
import useNetwork from '../hooks/useNetwork';
import { OfflineBanner } from '../components/OfflineBanner';

// TAREAS → Realtime Database (requiere internet). Cada usuario guarda en tasks/{uid}
const Tasks = () => {
  const { user } = useAuth();
  const { isOnline } = useNetwork();
  const { results, isPending, error, add, update, remove } = useRealTimeCollection(
    user?.uid ? `tasks/${user.uid}` : null
  );
  const [titulo, setTitulo] = useState('');

  const handleAgregar = async () => {
    if (!titulo.trim()) return;
    await add({ titulo: titulo.trim(), completada: false });
    setTitulo('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Tareas (Realtime)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <OfflineBanner isOnline={isOnline} />

        <IonItem>
          <IonInput
            label="Nueva tarea"
            labelPlacement="floating"
            value={titulo}
            disabled={!isOnline}
            onIonInput={(e) => setTitulo(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" disabled={!isOnline} onClick={handleAgregar}>
          Agregar tarea
        </IonButton>

        {isPending && <IonSpinner name="crescent" />}
        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonList>
          {results.map((t) => (
            <IonItem key={t.id}>
              <IonCheckbox
                slot="start"
                checked={!!t.completada}
                disabled={!isOnline}
                onIonChange={(e) => {
                  if (e.detail.checked !== !!t.completada) update(t.id, { completada: e.detail.checked });
                }}
              />
              <IonLabel style={{ textDecoration: t.completada ? 'line-through' : 'none' }}>
                {t.titulo}
              </IonLabel>
              <IonButton fill="clear" color="danger" disabled={!isOnline} onClick={() => remove(t.id)}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
