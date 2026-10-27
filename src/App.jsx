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
import TasksList from './pages/TasksList';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';

setupIonicReact();

const App = () => {
  const { user, loading } = useAuth();

  // Páginas privadas: sin sesión → /login. Páginas públicas: con sesión → /tasks
  const privada = (Page) => () => (user ? <Page /> : <Redirect to="/login" />);
  const publica = (Page) => () => (user ? <Redirect to="/tasks" /> : <Page />);

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
            <Route exact path="/tasks" render={privada(TasksList)} />
            {/* /tasks/new debe ir ANTES de /tasks/:id */}
            <Route exact path="/tasks/new" render={privada(TaskForm)} />
            <Route exact path="/tasks/:id/edit" render={privada(TaskForm)} />
            <Route exact path="/tasks/:id" render={privada(TaskDetail)} />
            <Route exact path="/" render={() => <Redirect to="/tasks" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
