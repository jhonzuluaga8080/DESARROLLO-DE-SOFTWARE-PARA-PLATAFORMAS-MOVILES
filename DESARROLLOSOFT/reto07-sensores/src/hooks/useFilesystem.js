import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Directory.Data = carpeta privada de la app (siempre funciona, sin permisos).
// Si prefieres la carpeta pública, cambia por Directory.Documents.
const DIRECTORIO = Directory.Data;

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ejecuta una operación manejando loading / error
  const run = async (fn, valorSiFalla) => {
    try {
      setLoading(true);
      setError(null);
      return await fn();
    } catch (err) {
      setError(err.message || String(err));
      return valorSiFalla;
    } finally {
      setLoading(false);
    }
  };

  const writeFile = ({ path, data, directory = DIRECTORIO, isJson = true }) =>
    run(async () => {
      const content = isJson ? JSON.stringify(data) : data;
      await Filesystem.writeFile({ path, data: content, directory, encoding: Encoding.UTF8 });
      return true;
    }, false);

  const readFile = ({ path, directory = DIRECTORIO, isJson = true }) =>
    run(async () => {
      const result = await Filesystem.readFile({ path, directory, encoding: Encoding.UTF8 });
      return isJson ? JSON.parse(result.data) : result.data;
    }, null);

  const deleteFile = ({ path, directory = DIRECTORIO }) =>
    run(async () => {
      await Filesystem.deleteFile({ path, directory });
      return true;
    }, false);

  const listFiles = ({ path = '', directory = DIRECTORIO } = {}) =>
    run(async () => {
      const result = await Filesystem.readdir({ path, directory });
      return result.files.map((f) => (typeof f === 'string' ? f : f.name));
    }, []);

  const createDir = ({ path, directory = DIRECTORIO }) =>
    run(async () => {
      await Filesystem.mkdir({ path, directory, recursive: true });
      return true;
    }, false);

  const deleteDir = ({ path, directory = DIRECTORIO, recursive = true }) =>
    run(async () => {
      await Filesystem.rmdir({ path, directory, recursive });
      return true;
    }, false);

  return { loading, error, writeFile, readFile, deleteFile, listFiles, createDir, deleteDir };
};
