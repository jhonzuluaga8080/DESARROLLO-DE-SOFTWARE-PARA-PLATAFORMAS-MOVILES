import { useState } from 'react';
import {
  collection, query, where, getDocs,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// CRUD básico para cualquier colección de Firestore
const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // filters: [["userId", "==", "abc"], ...]
  const getAll = async (filters = []) => {
    setIsPending(true);
    setError(null);
    try {
      let q = query(collection(db, table));
      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value));
      }
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setResults(docs);
      setIsPending(false);
      return docs;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return [];
    }
  };

  const add = async (data) => {
    setIsPending(true);
    setError(null);
    try {
      const ref = await addDoc(collection(db, table), { ...data, createdAt: serverTimestamp() });
      setIsPending(false);
      return ref;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);
    try {
      await updateDoc(doc(db, table, id), { ...data, updatedAt: serverTimestamp() });
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const remove = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, getAll, add, update, remove };
};

export default useCollection;
