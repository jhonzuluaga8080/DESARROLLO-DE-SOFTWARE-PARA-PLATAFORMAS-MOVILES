import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
} from '@ionic/react';
import { personCircle, medkit, logOutOutline } from 'ionicons/icons';
import { DoctorSession } from '../services/auth';

interface PerfilTabProps {
  session: DoctorSession;
  onLogout: () => void;
}

const PerfilTab: React.FC<PerfilTabProps> = ({ session, onLogout }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <IonAvatar style={{ width: '96px', height: '96px', margin: '0 auto' }}>
            <IonIcon icon={personCircle} style={{ fontSize: '96px' }} />
          </IonAvatar>
          <h2>{session.name}</h2>
          <p>{session.specialty}</p>
        </div>

        <IonList>
          <IonItem>
            <IonIcon icon={medkit} slot="start" />
            <IonLabel>
              <p>Usuario</p>
              <h2>{session.username}</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={medkit} slot="start" />
            <IonLabel>
              <p>Especialidad</p>
              <h2>{session.specialty}</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          color="danger"
          className="ion-margin-top"
          onClick={onLogout}
        >
          <IonIcon icon={logOutOutline} slot="start" />
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PerfilTab;
