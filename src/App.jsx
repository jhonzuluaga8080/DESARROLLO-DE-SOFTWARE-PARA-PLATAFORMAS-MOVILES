import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Fruits from './pages/Fruits';

setupIonicReact();

const App = () => {
  const { user, loading } = useAuth();

  // Privadas: sin sesión → /login.  Públicas: con sesión → /home
  const privada = (Page) => () => (user ? <Page /> : <Redirect to="/login" />);
  const publica = (Page) => () => (user ? <Redirect to="/home" /> : <Page />);

  return (
    <IonApp>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
          <IonSpinner name="crescent" />
        </div>
      ) : (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" render={publica(Login)} />
            <Route exact path="/register" render={publica(Register)} />
            <Route exact path="/home" render={privada(Home)} />
            <Route exact path="/contacts" render={privada(Contacts)} />
            <Route exact path="/tasks" render={privada(Tasks)} />
            <Route exact path="/fruits" render={privada(Fruits)} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
