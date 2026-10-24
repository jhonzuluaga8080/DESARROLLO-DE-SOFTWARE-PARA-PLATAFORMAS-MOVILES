import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonText, IonSpinner } from '@ionic/react';
import { useApp } from '../context/AppContext';

const mensajeError = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos';
    case 'auth/email-already-in-use':
      return 'Ese correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener mínimo 6 caracteres';
    case 'auth/invalid-email':
      return 'El correo no es válido';
    default:
      return 'Ocurrió un error, intenta de nuevo';
  }
};

const Login = () => {
  const { login, register } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviar = async (accion) => {
    setError('');
    setCargando(true);
    try {
      await accion(email.trim(), password);
      // al entrar, onAuthStateChanged actualiza el usuario y la ruta redirige a /home
    } catch (e) {
      setError(mensajeError(e.code));
    }
    setCargando(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones - Ingresar</IonTitle>
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

        <IonButton expand="block" className="ion-margin-top" disabled={cargando} onClick={() => enviar(login)}>
          {cargando ? <IonSpinner name="crescent" /> : 'Iniciar sesión'}
        </IonButton>
        <IonButton expand="block" fill="outline" disabled={cargando} onClick={() => enviar(register)}>
          Registrarme
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
