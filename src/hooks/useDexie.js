import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/db';

// CRUD para una tabla de Dexie. useLiveQuery actualiza `results` en tiempo real.
const useDexie = (table) => {
  const [search, setSearch] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const results =
    useLiveQuery(async () => {
      const all = await db[table].orderBy('id').reverse().toArray();
      const text = search.trim().toLowerCase();
      if (!text) return all;
      return all.filter((item) => item.nombre?.toLowerCase().includes(text));
    }, [table, search]) ?? [];

  // ⭐ newFunction: busca por nombre (la lista se filtra sola gracias a useLiveQuery)
  const searchByName = (text) => setSearch(text);

  const add = async (data) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].add({ ...data, createdAt: new Date().toISOString() });
    } catch (err) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].update(id, data);
    } catch (err) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const deleteItem = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].delete(id);
    } catch (err) {
      setError(err.message);
    }
    setIsPending(false);
  };

  return { results, isPending, error, search, searchByName, add, update, deleteItem };
};

export default useDexie;
