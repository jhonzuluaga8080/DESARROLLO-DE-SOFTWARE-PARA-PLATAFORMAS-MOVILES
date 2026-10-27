import Dexie from 'dexie';

// Base de datos LOCAL (IndexedDB). Funciona sin internet.
const db = new Dexie('MiAppDB');

// Versión 1: campos iniciales
db.version(1).stores({
  frutas: '++id, nombre, createdAt',
});

// Versión 2: se agregan los campos proveedor y fechaCosecha
db.version(2).stores({
  frutas: '++id, nombre, proveedor, fechaCosecha, createdAt',
});

export default db;
