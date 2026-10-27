import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Pega aquí la config de tu app web (Firebase Console → Configuración del proyecto → Tus apps)
// IMPORTANTE: databaseURL aparece solo después de crear la Realtime Database.
const firebaseConfig = {
  apiKey: "AIzaSyAc81m-BxbkrX8AQJ7yENh7rK6a5k0Ibss",
  authDomain: "reto-6-e3a31.firebaseapp.com",
  projectId: "reto-6-e3a31",
  storageBucket: "reto-6-e3a31.firebasestorage.app",
  messagingSenderId: "990140952620",
  appId: "1:990140952620:web:1570ca037c04ccf39e6189",
  measurementId: "G-DGZEEE62QE",
  databaseURL: "https://reto-6-e3a31-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);      // Firestore  → Contactos
export const rtdb = getDatabase(app);     // Realtime DB → Tareas
