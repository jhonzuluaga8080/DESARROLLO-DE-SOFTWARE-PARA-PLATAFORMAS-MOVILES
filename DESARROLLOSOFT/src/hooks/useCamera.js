import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

export const useCamera = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  // Camera.getPhoto(): abre la cámara o la galería (el usuario elige)
  const takePhoto = async () => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
      });
      setPhoto(image.webPath);
    } catch (err) {
      setError(err.message || String(err)); // también cae aquí si el usuario cancela
    }
  };

  return { photo, error, takePhoto };
};
