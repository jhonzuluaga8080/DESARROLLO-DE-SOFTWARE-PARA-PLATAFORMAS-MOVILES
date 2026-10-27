import { useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const watchId = useRef(null);

  const pedirPermiso = async () => {
    try {
      await Geolocation.requestPermissions();
    } catch (e) {
      // en web no está implementado: se ignora
    }
  };

  // Geolocation.getCurrentPosition(): una sola lectura
  const getCurrentLocation = async () => {
    try {
      setError(null);
      await pedirPermiso();
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      setPosition(pos.coords);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  // Geolocation.watchPosition(): lecturas continuas
  const startTracking = async () => {
    if (watchId.current) return;
    try {
      setError(null);
      await pedirPermiso();
      watchId.current = await Geolocation.watchPosition({ enableHighAccuracy: true }, (pos, err) => {
        if (err) {
          setError(err.message || String(err));
          return;
        }
        setPosition(pos.coords);
      });
      setTracking(true);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const stopTracking = async () => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
    }
    setTracking(false);
  };

  // Al salir de la página se detiene el seguimiento
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return { position, error, tracking, getCurrentLocation, startTracking, stopTracking };
};
