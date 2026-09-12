import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonAvatar,
  IonNote,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const PACIENTES = [
  { id: '1', nombre: 'María Fernández', cc: '1020304050', ultimaVisita: 'Hoy 08:00' },
  { id: '2', nombre: 'Juan Pérez', cc: '1030405060', ultimaVisita: 'Hoy 09:30' },
  { id: '3', nombre: 'Laura Gómez', cc: '1040506070', ultimaVisita: 'Hoy 11:00' },
  { id: '4', nombre: 'Roberto Silva', cc: '1050607080', ultimaVisita: 'Hoy 14:00' },
  { id: '5', nombre: 'Carmen Ruiz', cc: '1060708090', ultimaVisita: 'Hoy 16:30' },
];

const PacientesTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonText color="medium">
            <p>Pacientes con visitas programadas para hoy.</p>
          </IonText>
        </div>

        <IonList>
          {PACIENTES.map((paciente) => (
            <IonItem key={paciente.id}>
              <IonAvatar slot="start">
                <IonIcon icon={personCircle} style={{ fontSize: '40px' }} />
              </IonAvatar>
              <IonLabel>
                <h2>{paciente.nombre}</h2>
                <p>CC: {paciente.cc}</p>
              </IonLabel>
              <IonNote slot="end">{paciente.ultimaVisita}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PacientesTab;
