import { useState } from 'react';
import { IonApp, IonSpinner, setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Results from './pages/Results';

setupIonicReact();

// Navegación simple por estado: sin sesión → Login; con sesión → Misiones o Resultados
const Pantallas = () => {
  const { user, loading } = useApp();
  const [pantalla, setPantalla] = useState('home');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (!user) return <Login />;
  if (pantalla === 'resultados') return <Results onVolver={() => setPantalla('home')} />;
  return <Home onResultados={() => setPantalla('resultados')} />;
};

const App = () => (
  <IonApp>
    <AppProvider>
      <Pantallas />
    </AppProvider>
  </IonApp>
);

export default App;
