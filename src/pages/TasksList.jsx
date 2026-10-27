import { useHistory } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonFab, IonFabButton,
  IonSpinner, IonText,
} from '@ionic/react';
import { add, logOutOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';

const TasksList = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { tasks, loading, error, updateTask } = useTasks();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonText color="medium"><p className="ion-padding-horizontal">{user?.email}</p></IonText>

        {loading && <IonSpinner name="crescent" className="ion-margin" />}
        {error && <IonText color="danger"><p className="ion-padding">{error}</p></IonText>}
        {!loading && !error && tasks.length === 0 && (
          <IonText color="medium"><p className="ion-padding">No tienes tareas. Crea la primera con el botón +</p></IonText>
        )}

        <IonList>
          {tasks.map((t) => (
            <IonItem key={t.id}>
              <IonCheckbox
                slot="start"
                checked={t.completed}
                onIonChange={(e) => {
                  // solo si el usuario realmente cambió el valor
                  if (e.detail.checked !== t.completed) updateTask(t.id, { completed: e.detail.checked });
                }}
              />
              <IonLabel
                style={{ cursor: 'pointer', textDecoration: t.completed ? 'line-through' : 'none' }}
                onClick={() => history.push(`/tasks/${t.id}`)}
              >
                <h2>{t.title}</h2>
                {t.description && <p>{t.description}</p>}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => history.push('/tasks/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TasksList;
