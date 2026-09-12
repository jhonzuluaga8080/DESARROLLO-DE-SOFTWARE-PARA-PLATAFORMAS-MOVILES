import { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, people, person } from 'ionicons/icons';
import Login from './pages/Login';
import VisitasTab from './pages/VisitasTab';
import VisitDetail from './pages/VisitDetail';
import PacientesTab from './pages/PacientesTab';
import PerfilTab from './pages/PerfilTab';
import { getSession, logout, DoctorSession } from './services/auth';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<DoctorSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(getSession());
    setLoading(false);
  }, []);

  const handleLogout = () => {
    logout();
    setSession(null);
  };

  if (loading) {
    return (
      <IonApp>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Cargando...
        </div>
      </IonApp>
    );
  }

  if (!session) {
    return (
      <IonApp>
        <IonReactRouter>
          <Route path="*" element={<Login onLoginSuccess={setSession} />} />
        </IonReactRouter>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tabs/visitas" element={<VisitasTab />} />
            <Route path="/tabs/visitas/:id" element={<VisitDetail />} />
            <Route path="/tabs/pacientes" element={<PacientesTab />} />
            <Route path="/tabs/perfil" element={<PerfilTab session={session} onLogout={handleLogout} />} />
            <Route path="/tabs" element={<Navigate to="/tabs/visitas" replace />} />
            <Route path="/" element={<Navigate to="/tabs/visitas" replace />} />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="visitas" href="/tabs/visitas">
              <IonIcon icon={calendar} />
              <IonLabel>Visitas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="pacientes" href="/tabs/pacientes">
              <IonIcon icon={people} />
              <IonLabel>Pacientes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="perfil" href="/tabs/perfil">
              <IonIcon icon={person} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
