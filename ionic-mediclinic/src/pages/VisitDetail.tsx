import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
} from '@ionic/react';
import {
  getVisitById,
  updateVisitStatus,
  getNextStatus,
  getStatusLabel,
  getStatusColor,
  Visit,
  VisitStatus,
} from '../services/visits';

const VisitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const found = getVisitById(id ?? '');
    setVisit(found || null);
  }, [id]);

  const handleStatusChange = () => {
    if (!visit) return;

    const nextStatus = getNextStatus(visit.estado);
    if (!nextStatus) {
      setToastMessage('La visita ya está finalizada');
      setShowToast(true);
      return;
    }

    const updated = updateVisitStatus(visit.id, nextStatus);
    if (updated) {
      setVisit(updated);
      setToastMessage(`Estado actualizado a: ${getStatusLabel(nextStatus)}`);
      setShowToast(true);
    }
  };

  if (!visit) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/visitas" />
            </IonButtons>
            <IonTitle>Visita no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>La visita solicitada no existe.</p>
          <IonButton onClick={() => navigate('/tabs/visitas')}>
            Volver a visitas
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const nextStatus = getNextStatus(visit.estado);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/visitas" />
          </IonButtons>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1>{visit.paciente}</h1>
          <IonBadge color={getStatusColor(visit.estado)}>
            {getStatusLabel(visit.estado)}
          </IonBadge>
        </div>

        <IonList>
          <IonItem>
            <IonLabel>
              <p>Hora</p>
              <h2>{visit.hora}</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Dirección</p>
              <h2>{visit.direccion}</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Motivo</p>
              <h2>{visit.motivo}</h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Fecha</p>
              <h2>{visit.fecha}</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        {nextStatus && (
          <IonButton expand="block" className="ion-margin-top" onClick={handleStatusChange}>
            Cambiar a: {getStatusLabel(nextStatus as VisitStatus)}
          </IonButton>
        )}

        <div className="ion-text-center ion-margin-top">
          <p><small>Flujo: Pendiente → En camino → Finalizada</small></p>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
          color="success"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default VisitDetail;
