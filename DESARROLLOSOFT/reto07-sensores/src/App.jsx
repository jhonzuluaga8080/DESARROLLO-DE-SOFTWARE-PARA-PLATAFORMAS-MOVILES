import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

import Home from './pages/Home';
import GeolocationPage from './pages/GeolocationPage';
import CameraPage from './pages/CameraPage';
import AccelerometerPage from './pages/AccelerometerPage';
import DevicePage from './pages/DevicePage';
import HapticsPage from './pages/HapticsPage';
import FilesystemPage from './pages/FilesystemPage';
import LocalNotificationsPage from './pages/LocalNotificationsPage';
import PushNotificationsPage from './pages/PushNotificationsPage';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/geolocation" component={GeolocationPage} />
        <Route exact path="/camera" component={CameraPage} />
        <Route exact path="/accelerometer" component={AccelerometerPage} />
        <Route exact path="/device" component={DevicePage} />
        <Route exact path="/haptics" component={HapticsPage} />
        <Route exact path="/filesystem" component={FilesystemPage} />
        <Route exact path="/local-notifications" component={LocalNotificationsPage} />
        <Route exact path="/push-notifications" component={PushNotificationsPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
