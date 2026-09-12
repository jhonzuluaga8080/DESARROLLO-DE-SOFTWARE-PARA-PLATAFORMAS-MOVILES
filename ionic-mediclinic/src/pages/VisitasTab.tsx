import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import {
  getTodayVisits,
  getStatusLabel,
  getStatusColor,
  Visit,
} from '../services/visits';

const VisitasTab: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const navigate = useNavigate();

  const loadVisits = () => {
    setVisits(getTodayVisits());
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const handleRefresh = (event: CustomEvent) => {
    loadVisits();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {visits.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonText color="medium">
              <p>No hay visitas programadas para hoy.</p>
            </IonText>
          </div>
        ) : (
          <IonList>
            {visits.map((visit) => (
              <IonItem
                key={visit.id}
                button
                detail
                onClick={() => navigate(`/tabs/visitas/${visit.id}`)}
              >
                <IonLabel>
                  <h2>{visit.paciente}</h2>
                  <p>{visit.motivo}</p>
                  <p>Hora: {visit.hora}</p>
                </IonLabel>
                <IonBadge slot="end" color={getStatusColor(visit.estado)}>
                  {getStatusLabel(visit.estado)}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default VisitasTab;
