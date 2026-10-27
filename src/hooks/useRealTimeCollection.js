import { useEffect, useState } from 'react';
import { ref, push, update as dbUpdate, remove as dbRemove, onValue } from 'firebase/database';
import { rtdb } from '../firebase/config';

// CRUD para una ruta de Realtime Database. onValue mantiene `results` actualizado en vivo.
const useRealTimeCollection = (path) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;
    setIsPending(true);
    const unsubscribe = onValue(
      ref(rtdb, path),
      (snapshot) => {
        const value = snapshot.val();
        const lista = value ? Object.entries(value).map(([id, v]) => ({ id, ...v })) : [];
        lista.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setResults(lista);
        setError(null);
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsubscribe();
  }, [path]);

  const add = async (data) => {
    setError(null);
    try {
      return await push(ref(rtdb, path), { ...data, createdAt: Date.now() });
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const update = async (id, data) => {
    setError(null);
    try {
      await dbUpdate(ref(rtdb, `${path}/${id}`), { ...data, updatedAt: Date.now() });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const remove = async (id) => {
    setError(null);
    try {
      await dbRemove(ref(rtdb, `${path}/${id}`));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { results, isPending, error, add, update, remove };
};

export default useRealTimeCollection;
