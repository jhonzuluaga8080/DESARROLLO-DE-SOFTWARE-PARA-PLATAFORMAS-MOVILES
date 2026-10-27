import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonText, IonSpinner,
} from '@ionic/react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    setError('');
    setCargando(true);
    try {
      await login(email.trim(), password);
      // al iniciar sesión, App redirige automáticamente a /home
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
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

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonButton expand="block" className="ion-margin-top" disabled={cargando} onClick={handleLogin}>
          {cargando ? <IonSpinner name="crescent" /> : 'Entrar'}
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          ¿No tienes cuenta? Regístrate
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
