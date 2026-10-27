import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonList, IonItem, IonLabel, IonChip, IonText,
} from '@ionic/react';
import { wifiOutline, cellularOutline, cloudOfflineOutline, logOutOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import useNetwork from '../hooks/useNetwork';

const Home = () => {
  const { user, logout } = useAuth();
  const { isOnline, connectionType } = useNetwork();

  const icono = !isOnline ? cloudOfflineOutline : connectionType === 'wifi' ? wifiOutline : cellularOutline;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="medium"><p>{user?.email}</p></IonText>
        <IonChip color={isOnline ? 'success' : 'danger'}>
          <IonIcon icon={icono} />
          <IonLabel>{isOnline ? `Conectado (${connectionType ?? '...'})` : 'Sin conexión'}</IonLabel>
        </IonChip>

        <IonList>
          <IonItem routerLink="/contacts" detail>
            <IonLabel>
              <h2>Contactos</h2>
              <p>Firestore · requiere internet</p>
            </IonLabel>
          </IonItem>
          <IonItem routerLink="/tasks" detail>
            <IonLabel>
              <h2>Tareas</h2>
              <p>Realtime Database · requiere internet</p>
            </IonLabel>
          </IonItem>
          <IonItem routerLink="/fruits" detail>
            <IonLabel>
              <h2>Frutas</h2>
              <p>Dexie (local) · funciona sin internet</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
