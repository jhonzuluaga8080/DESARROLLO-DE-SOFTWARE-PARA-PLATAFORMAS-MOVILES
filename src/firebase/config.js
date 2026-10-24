import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Pega aquí los datos de tu proyecto (Firebase Console → Configuración del proyecto → Tus apps → Web)
const firebaseConfig = {
  apiKey: "AIzaSyDTvZ-c_Pbe40LLC5JhEmTZkc5zpX3jzO8",
  authDomain: "desarrollosoftware-3703b.firebaseapp.com",
  projectId: "desarrollosoftware-3703b",
  storageBucket: "desarrollosoftware-3703b.firebasestorage.app",
  messagingSenderId: "700341844246",
  appId: "1:700341844246:web:c4208ab3d0538cc4f57837",
  measurementId: "G-KB0XF2CD26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
