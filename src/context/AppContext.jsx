import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNotifications } from '../hooks/useNotifications';

// Las 3 misiones (30 + 50 + 40 = 120 puntos en total)
export const MISIONES = [
  { id: 1, titulo: 'Misión 1: Evidencia', descripcion: 'Toma una foto con la cámara.', puntos: 30 },
  { id: 2, titulo: 'Misión 2: Movimiento real', descripcion: 'Muévete 50 metros desde tu posición original.', puntos: 50 },
  { id: 3, titulo: 'Misión 3: Permanencia activa', descripcion: 'Quédate quieto 10 segundos (se desbloquea al terminar la misión 2).', puntos: 40 },
];

const progresoInicial = () => ({
  points: 0,
  missions: MISIONES.map((m) => ({ id: m.id, completed: false })),
});

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(progresoInicial());
  const progressRef = useRef(progress); // para leer siempre el valor más nuevo dentro de callbacks
  const userRef = useRef(null);
  const { requestPermission, notify } = useNotifications();

  // Guarda en estado + localStorage + Firebase
  const persist = (next) => {
    progressRef.current = next;
    setProgress(next);
    const u = userRef.current;
    if (!u) return;
    localStorage.setItem(`progress_${u.uid}`, JSON.stringify(next));
    setDoc(doc(db, 'users', u.uid), { email: u.email, ...next }, { merge: true }).catch((e) =>
      console.log('Firebase pendiente:', e.message)
    );
  };

  // Sesión + carga de progreso (primero local, luego Firebase)
  useEffect(() => {
    requestPermission();

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      userRef.current = u;
      setUser(u);

      if (!u) {
        progressRef.current = progresoInicial();
        setProgress(progressRef.current);
        setLoading(false);
        return;
      }

      // 1) Local (rápido, funciona sin internet)
      const saved = localStorage.getItem(`progress_${u.uid}`);
      const local = saved ? JSON.parse(saved) : progresoInicial();
      progressRef.current = local;
      setProgress(local);
      setLoading(false);

      // 2) Firebase: nos quedamos con el que tenga más puntos y sincronizamos ambos
      try {
        const snap = await getDoc(doc(db, 'users', u.uid));
        const remote = snap.exists() ? snap.data() : null;
        const best =
          remote && remote.points > local.points
            ? { points: remote.points, missions: remote.missions }
            : local;
        persist(best);
      } catch (e) {
        console.log('Sin conexión, uso datos locales');
      }
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const isCompleted = (id) => progress.missions.find((m) => m.id === id)?.completed ?? false;

  const completeMission = async (id) => {
    const actual = progressRef.current;
    if (actual.missions.find((m) => m.id === id)?.completed) return;

    const mision = MISIONES.find((m) => m.id === id);
    const next = {
      points: actual.points + mision.puntos,
      missions: actual.missions.map((m) => (m.id === id ? { ...m, completed: true } : m)),
    };
    persist(next);

    // Notificaciones locales
    await notify('Has completado una misión');
    const faltan = next.missions.filter((m) => !m.completed).length;
    if (faltan === 1) await notify('Te falta 1 misión para completar', 2);
  };

  // Útil para volver a probar
  const resetProgress = () => {
    if (userRef.current) {
      localStorage.removeItem(`foto_${userRef.current.uid}`);
    }
    persist(progresoInicial());
  };

  return (
    <AppContext.Provider
      value={{ user, loading, progress, login, register, logout, isCompleted, completeMission, resetProgress }}
    >
      {children}
    </AppContext.Provider>
  );
};
