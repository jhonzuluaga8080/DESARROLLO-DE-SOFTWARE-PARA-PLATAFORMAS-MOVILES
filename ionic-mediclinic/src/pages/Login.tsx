import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonToast,
  IonIcon,
} from '@ionic/react';
import { medical } from 'ionicons/icons';
import { login, DoctorSession } from '../services/auth';

interface LoginProps {
  onLoginSuccess: (session: DoctorSession) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    const session = login(username, password);
    if (session) {
      onLoginSuccess(session);
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>MediClinic Médicos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
          <IonIcon icon={medical} style={{ fontSize: '64px', color: 'var(--ion-color-primary)' }} />
          <h2>Iniciar sesión</h2>
          <p>Ingrese sus credenciales de médico</p>
        </div>

        <IonItem>
          <IonLabel position="stacked">Usuario</IonLabel>
          <IonInput
            value={username}
            onIonInput={(e) => setUsername(e.detail.value || '')}
            placeholder="dr.garcia"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value || '')}
            placeholder="••••••••"
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Ingresar
        </IonButton>

        <div className="ion-text-center ion-margin-top">
          <IonText color="medium">
            <p><small>dr.garcia / medico123</small></p>
            <p><small>dr.lopez / medico456</small></p>
          </IonText>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Credenciales incorrectas"
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
