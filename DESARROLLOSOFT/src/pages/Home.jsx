import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { SENSORS } from '../sensors';

const Home = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Sensores nativos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      {SENSORS.map((s) => (
        <IonButton key={s.path} expand="block" routerLink={s.path}>
          <IonIcon slot="start" icon={s.icon} />
          {s.title}
        </IonButton>
      ))}
    </IonContent>
  </IonPage>
);

export default Home;
