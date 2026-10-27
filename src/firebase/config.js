import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Pega aquí la config de tu app web (Firebase Console → Configuración del proyecto → Tus apps)
const firebaseConfig = {
  apiKey: "AIzaSyBpVzhmmgVnPCyLQ2a9_vFbaYL9aztZHak",
  authDomain: "reto-5-80db8.firebaseapp.com",
  projectId: "reto-5-80db8",
  storageBucket: "reto-5-80db8.firebasestorage.app",
  messagingSenderId: "886574985811",
  appId: "1:886574985811:web:1448e96a0b4149e6f24ca6",
  measurementId: "G-86DLMNCBRK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
