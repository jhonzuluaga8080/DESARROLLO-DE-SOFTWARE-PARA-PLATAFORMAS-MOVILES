import { useEffect, useState } from 'react';
import {
  collection, query, where, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const NOMBRE_COLECCION = 'tasks';

// Más recientes primero (las que aún no tienen fecha del servidor van arriba)
const fecha = (t) => t.createdAt?.seconds ?? Number.MAX_SAFE_INTEGER;

export const useTasksCollection = (uid) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Escucha en tiempo real SOLO las tareas del usuario logueado
  useEffect(() => {
    if (!uid) {
      setTasks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(collection(db, NOMBRE_COLECCION), where('userId', '==', uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        lista.sort((a, b) => fecha(b) - fecha(a));
        setTasks(lista);
        setError('');
        setLoading(false);
      },
      (e) => {
        setError('No se pudieron cargar las tareas: ' + e.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [uid]);

  const getTask = (id) => tasks.find((t) => t.id === id);

  const addTask = ({ title, description }) =>
    addDoc(collection(db, NOMBRE_COLECCION), {
      title,
      description,
      completed: false,
      userId: uid,
      createdAt: serverTimestamp(),
    });

  const updateTask = (id, data) =>
    updateDoc(doc(db, NOMBRE_COLECCION, id), { ...data, updatedAt: serverTimestamp() });

  const deleteTask = (id) => deleteDoc(doc(db, NOMBRE_COLECCION, id));

  return { tasks, loading, error, getTask, addTask, updateTask, deleteTask };
};
