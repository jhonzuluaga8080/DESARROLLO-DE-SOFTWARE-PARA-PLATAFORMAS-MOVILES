import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText, IonSpinner,
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRegister = async () => {
    setError('');
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setCargando(true);
    try {
      await register(email.trim(), password);
      // Firebase deja al usuario logueado y App redirige a /home
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Correo"
            labelPlacement="floating"
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Confirmar contraseña"
            labelPlacement="floating"
            type="password"
            value={confirm}
            onIonInput={(e) => setConfirm(e.detail.value ?? '')}
          />
        </IonItem>

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonButton expand="block" className="ion-margin-top" disabled={cargando} onClick={handleRegister}>
          {cargando ? <IonSpinner name="crescent" /> : 'Registrarme'}
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          ¿Ya tienes cuenta? Inicia sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
