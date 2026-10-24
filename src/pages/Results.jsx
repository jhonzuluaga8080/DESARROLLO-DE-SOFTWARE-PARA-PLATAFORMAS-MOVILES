import { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent,
  IonList, IonItem, IonLabel, IonNote, IonText, IonButton,
} from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useApp, MISIONES } from '../context/AppContext';

const nombre = (email) => (email ? email.split('@')[0] : 'usuario');

const COMPETIDORES_BASE = [
  { uid: 'comp_1', email: 'carlos_m@gmail.com', points: 110 },
  { uid: 'comp_2', email: 'laura_dev@gmail.com', points: 80 },
  { uid: 'comp_3', email: 'mateo_g@gmail.com', points: 50 },
  { uid: 'comp_4', email: 'sofia_v@gmail.com', points: 20 },
];

const Results = ({ onVolver }) => {
  const { user, progress, resetProgress } = useApp();
  const [ranking, setRanking] = useState([]);
  const [error, setError] = useState('');

  const hechas = progress.missions.filter((m) => m.completed).length;
  const estado =
    hechas === MISIONES.length ? '🏆 Completado' : hechas > 0 ? '⏳ En progreso' : '🕒 Sin iniciar';

  // Ranking Top 5: combina usuarios reales y posiciona tu puntaje frente a los otros 4
  useEffect(() => {
    const cargar = async () => {
      try {
        setError('');
        const snap = await getDocs(collection(db, 'users'));
        let lista = snap.docs.map((d) => ({
          uid: d.id,
          email: d.data().email,
          points: d.id === user.uid ? progress.points : d.data().points || 0,
        }));
        if (!lista.find((u) => u.uid === user.uid)) {
          lista.push({ uid: user.uid, email: user.email, points: progress.points });
        }
        // Complementar con competidores de referencia para garantizar el Top 5
        for (const c of COMPETIDORES_BASE) {
          if (lista.length >= 5) break;
          if (!lista.find((u) => u.email === c.email)) {
            lista.push(c);
          }
        }
        lista.sort((a, b) => b.points - a.points);
        setRanking(lista);
      } catch (e) {
        // Fallback local si Firebase aún no responde
        const lista = [
          { uid: user.uid, email: user.email, points: progress.points },
          ...COMPETIDORES_BASE,
        ];
        lista.sort((a, b) => b.points - a.points);
        setRanking(lista);
      }
    };
    cargar();
  }, [progress.points, user]);


  const top5 = ranking.slice(0, 5);
  const miPosicion = ranking.findIndex((u) => u.uid === user.uid);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onVolver}>← Volver</IonButton>
          </IonButtons>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Puntos totales: {progress.points}</h2>
        <p>Misiones completadas: {hechas} / {MISIONES.length}</p>
        <p>Estado general: <b>{estado}</b></p>

        <h3>Ranking (Top 5)</h3>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonList>
          {top5.map((u, i) => (
            <IonItem key={u.uid} color={u.uid === user.uid ? 'light' : undefined}>
              <IonLabel>
                {i + 1}. {nombre(u.email)} {u.uid === user.uid && '(tú)'}
              </IonLabel>
              <IonNote slot="end">{u.points} pts</IonNote>
            </IonItem>
          ))}
          {miPosicion >= 5 && (
            <IonItem color="light">
              <IonLabel>{miPosicion + 1}. {nombre(user.email)} (tú)</IonLabel>
              <IonNote slot="end">{progress.points} pts</IonNote>
            </IonItem>
          )}
        </IonList>

        <IonButton expand="block" fill="outline" color="medium" onClick={resetProgress}>
          Reiniciar misiones (para volver a probar)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Results;
