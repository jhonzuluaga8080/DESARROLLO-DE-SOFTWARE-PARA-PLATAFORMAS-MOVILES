import {
  locationOutline, cameraOutline, speedometerOutline, hardwareChipOutline,
  pulseOutline, folderOutline, notificationsOutline, cloudUploadOutline,
} from 'ionicons/icons';

// Lista de sensores: el Home crea un botón por cada uno
export const SENSORS = [
  { path: '/geolocation', title: 'Geolocation (GPS)', icon: locationOutline },
  { path: '/camera', title: 'Camera', icon: cameraOutline },
  { path: '/accelerometer', title: 'Motion (Acelerómetro)', icon: speedometerOutline },
  { path: '/device', title: 'Device', icon: hardwareChipOutline },
  { path: '/haptics', title: 'Haptics (Vibración)', icon: pulseOutline },
  { path: '/filesystem', title: 'Filesystem', icon: folderOutline },
  { path: '/local-notifications', title: 'Local Notifications', icon: notificationsOutline },
  { path: '/push-notifications', title: 'Push Notifications', icon: cloudUploadOutline },
];
