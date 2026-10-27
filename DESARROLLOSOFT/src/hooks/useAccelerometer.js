import { useEffect, useRef, useState } from 'react';
import { Motion } from '@capacitor/motion';

// Motion.addListener("accel") → aceleración   |   Motion.addListener("orientation") → orientación
export const useAccelerometer = ({ threshold = 20, interval = 100, shakeDelay = 1000 } = {}) => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [magnitude, setMagnitude] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState(null);

  const lastUpdate = useRef(0);
  const lastShake = useRef(0);
  const shakeTimer = useRef(null);
  const accelListener = useRef(null);
  const orientListener = useRef(null);

  const start = async () => {
    if (accelListener.current) return;
    try {
      setError(null);

      accelListener.current = await Motion.addListener('accel', (event) => {
        const now = Date.now();
        if (now - lastUpdate.current < interval) return; // limita la frecuencia
        lastUpdate.current = now;

        const acc = event.acceleration || {};
        const x = acc.x || 0;
        const y = acc.y || 0;
        const z = acc.z || 0;
        setAcceleration({ x, y, z });

        const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
        setMagnitude(total);
        setIsMoving(total > 2);

        // "shake" = movimiento fuerte, con un tiempo mínimo entre sacudidas
        if (total > threshold && now - lastShake.current > shakeDelay) {
          setIsShaking(true);
          lastShake.current = now;
          clearTimeout(shakeTimer.current);
          shakeTimer.current = setTimeout(() => setIsShaking(false), 500);
        }
      });

      orientListener.current = await Motion.addListener('orientation', (event) => {
        setOrientation({ alpha: event.alpha || 0, beta: event.beta || 0, gamma: event.gamma || 0 });
      });
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const stop = async () => {
    if (accelListener.current) {
      await accelListener.current.remove();
      accelListener.current = null;
    }
    if (orientListener.current) {
      await orientListener.current.remove();
      orientListener.current = null;
    }
  };

  useEffect(() => {
    start();
    return () => {
      stop();
      clearTimeout(shakeTimer.current);
    };
  }, []);

  return { acceleration, orientation, magnitude, isShaking, isMoving, error, start, stop };
};
