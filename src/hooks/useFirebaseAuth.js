import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Traduce los códigos de Firebase a mensajes entendibles
const mensajeError = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos';
    case 'auth/email-already-in-use':
      return 'Ese correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener mínimo 6 caracteres';
    case 'auth/invalid-email':
      return 'El correo no es válido';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet';
    default:
      return 'Ocurrió un error, intenta de nuevo';
  }
};

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true mientras Firebase revisa si hay sesión

  // Firebase avisa cada vez que alguien inicia o cierra sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Las funciones lanzan un Error con mensaje amigable; la página lo muestra
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw new Error(mensajeError(e.code));
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw new Error(mensajeError(e.code));
    }
  };

  const logout = () => signOut(auth);

  return { user, loading, login, register, logout };
};
