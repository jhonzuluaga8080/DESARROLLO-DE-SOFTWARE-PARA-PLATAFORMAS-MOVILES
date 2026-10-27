import { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';

// Detecta si hay internet (wifi | cellular | none) y avisa cuando cambia
const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState(null);

  useEffect(() => {
    let listener = null;
    let cancelled = false;

    Network.getStatus().then((status) => {
      if (cancelled) return;
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    }).then((l) => {
      if (cancelled) l.remove();
      else listener = l;
    });

    return () => {
      cancelled = true;
      listener?.remove();
    };
  }, []);

  return { isOnline, connectionType };
};

export default useNetwork;
