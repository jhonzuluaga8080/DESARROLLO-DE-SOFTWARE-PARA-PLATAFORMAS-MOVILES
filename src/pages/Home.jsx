import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonProgressBar } from '@ionic/react';
import { useApp, MISIONES } from '../context/AppContext';
import { MissionPhoto } from '../components/MissionPhoto';
import { MissionMove } from '../components/MissionMove';
import { MissionStill } from '../components/MissionStill';

const Home = ({ onResultados }) => {
  const { progress, logout } = useApp();
  const total = MISIONES.length;
  const hechas = progress.missions.filter((m) => m.completed).length;
  const porcentaje = Math.round((hechas / total) * 100);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onResultados}>Resultados</IonButton>
            <IonButton onClick={logout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Puntos: {progress.points}</h2>
        <IonProgressBar value={hechas / total} />
        <p>{porcentaje}% completado · {hechas}/{total} misiones</p>

        <MissionPhoto />
        <MissionMove />
        <MissionStill />
      </IonContent>
    </IonPage>
  );
};

export default Home;
