import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonInput, IonTextarea, IonButton, IonText, IonSpinner,
} from '@ionic/react';
import { useTasks } from '../context/TasksContext';

// Una sola página sirve para AGREGAR (/tasks/new) y EDITAR (/tasks/:id/edit)
const TaskForm = () => {
  const history = useHistory();
  const { id } = useParams(); // undefined cuando se está agregando
  const { getTask, addTask, updateTask } = useTasks();
  const task = id ? getTask(id) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Al editar, rellena el formulario cuando la tarea esté disponible
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task?.id]);

  const handleGuardar = async () => {
    if (!title.trim()) {
      setError('El título es obligatorio');
      return;
    }
    setError('');
    setGuardando(true);
    try {
      if (id) await updateTask(id, { title: title.trim(), description: description.trim() });
      else await addTask({ title: title.trim(), description: description.trim() });
      history.goBack();
    } catch (e) {
      setError('No se pudo guardar: ' + e.message);
      setGuardando(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{id ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="floating"
            value={title}
            onIonInput={(e) => setTitle(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Descripción"
            labelPlacement="floating"
            rows={4}
            value={description}
            onIonInput={(e) => setDescription(e.detail.value ?? '')}
          />
        </IonItem>

        {error && <IonText color="danger"><p>{error}</p></IonText>}

        <IonButton expand="block" className="ion-margin-top" disabled={guardando} onClick={handleGuardar}>
          {guardando ? <IonSpinner name="crescent" /> : 'Guardar'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskForm;
