import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonButton, IonBadge, IonAlert, IonSpinner, IonText,
} from '@ionic/react';
import { useTasks } from '../context/TasksContext';

const TaskDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const { getTask, loading, updateTask, deleteTask } = useTasks();
  const task = getTask(id);
  const [confirmar, setConfirmar] = useState(false);

  const handleEliminar = async () => {
    await deleteTask(id);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading && <IonSpinner name="crescent" />}
        {!loading && !task && <IonText color="danger"><p>La tarea no existe.</p></IonText>}

        {task && (
          <>
            <h1>{task.title}</h1>
            <IonBadge color={task.completed ? 'success' : 'warning'}>
              {task.completed ? 'Completada' : 'Pendiente'}
            </IonBadge>
            <p>{task.description || 'Sin descripción'}</p>
            {task.createdAt && (
              <IonText color="medium">
                <p>
                  Creada:{' '}
                  {typeof task.createdAt?.toDate === 'function'
                    ? task.createdAt.toDate().toLocaleString()
                    : 'Recientemente'}
                </p>
              </IonText>
            )}

            <IonButton expand="block" onClick={() => updateTask(id, { completed: !task.completed })}>
              {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            </IonButton>
            <IonButton expand="block" fill="outline" onClick={() => history.push(`/tasks/${id}/edit`)}>
              Editar
            </IonButton>
            <IonButton expand="block" fill="outline" color="danger" onClick={() => setConfirmar(true)}>
              Eliminar
            </IonButton>

            <IonAlert
              isOpen={confirmar}
              header="Eliminar tarea"
              message="¿Seguro que quieres eliminarla?"
              buttons={[
                { text: 'Cancelar', role: 'cancel', handler: () => setConfirmar(false) },
                { text: 'Eliminar', role: 'destructive', handler: handleEliminar },
              ]}
              onDidDismiss={() => setConfirmar(false)}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;
