import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  // Devuelve la foto como dataUrl (pequeña, para poder guardarla en localStorage)
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 40,
      width: 400,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    return image.dataUrl;
  };

  return { takePhoto };
};
