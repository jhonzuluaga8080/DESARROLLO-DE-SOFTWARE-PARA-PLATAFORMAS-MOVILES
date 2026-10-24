import { useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

// Distancia en metros entre dos coordenadas (fórmula de Haversine)
const distanciaMetros = (a, b) => {
  const R = 6371000;
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export const useMovement = ({ target, onReached }) => {
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);
  const watchId = useRef(null);
  const origin = useRef(null);
  const onReachedRef = useRef(onReached);
  onReachedRef.current = onReached; // siempre la versión más reciente

  const stop = async () => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
    }
    setTracking(false);
  };

  const start = async () => {
    try {
      await Geolocation.requestPermissions();
    } catch (e) {
      // en web no está implementado, se ignora
    }

    // 1) posición original
    const first = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    origin.current = first.coords;
    setDistance(0);
    setTracking(true);

    // 2) seguir la posición y medir distancia
    watchId.current = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (pos, err) => {
        if (err || !pos) return;
        const d = distanciaMetros(origin.current, pos.coords);
        setDistance(d);
        if (d >= target) {
          stop();
          onReachedRef.current();
        }
      }
    );
  };

  const simulateStep = (meters = 15) => {
    setDistance((prev) => {
      const next = prev + meters;
      if (next >= target) {
        stop();
        onReachedRef.current();
      }
      return next;
    });
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { distance, tracking, start, simulateStep };
};

