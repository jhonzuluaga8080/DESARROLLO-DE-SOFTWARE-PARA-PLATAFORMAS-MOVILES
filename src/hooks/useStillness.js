import { useEffect, useRef, useState } from 'react';
import { Motion } from '@capacitor/motion';

const GRAVEDAD = 9.81;

// Cuenta cuántos segundos seguidos está quieto el celular (acelerómetro).
// Si detecta movimiento, el contador vuelve a 0.
export const useStillness = ({ seconds = 10, threshold = 1, onDone }) => {
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);
  const listener = useRef(null);
  const timer = useRef(null);
  const lastMove = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const stop = async () => {
    clearInterval(timer.current);
    timer.current = null;
    if (listener.current) {
      await listener.current.remove();
      listener.current = null;
    }
    setActive(false);
  };

  const start = async () => {
    lastMove.current = Date.now();
    setElapsed(0);
    setActive(true);

    listener.current = await Motion.addListener('accel', (event) => {
      const g = event.accelerationIncludingGravity;
      if (!g) return;
      const magnitud = Math.sqrt(g.x ** 2 + g.y ** 2 + g.z ** 2);
      // Quieto = magnitud ≈ gravedad. Si se desvía, hubo movimiento.
      if (Math.abs(magnitud - GRAVEDAD) > threshold) {
        lastMove.current = Date.now();
      }
    });

    // setInterval no bloquea la pantalla
    timer.current = setInterval(() => {
      const quieto = (Date.now() - lastMove.current) / 1000;
      setElapsed(Math.min(quieto, seconds));
      if (quieto >= seconds) {
        stop();
        onDoneRef.current();
      }
    }, 200);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { active, elapsed, start };
};
