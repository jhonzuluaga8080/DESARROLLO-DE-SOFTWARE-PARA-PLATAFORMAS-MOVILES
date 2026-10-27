# Reto 07 – Sensores nativos con Ionic + React + Capacitor

Home con un botón por sensor y una página por cada uno:
Geolocation · Camera · Motion (acelerómetro/orientación) · Device · Haptics · Filesystem · Local Notifications · Push Notifications

## Correr en el navegador (solo para ver la interfaz)
```
npm install
npm run dev
```
En el navegador funcionan: Device, Filesystem, Geolocation (con permiso), Camera (elige archivo/cámara web).
Haptics, Motion y Push dependen del dispositivo.

## Correr en el celular Android (recomendado)
```
npm install @capacitor/android
npm run build
npx cap add android
npx cap sync android
npx cap run android
```
(Cada vez que cambies código: `npm run build && npx cap sync android` y vuelve a correr.)

### Permisos – android/app/src/main/AndroidManifest.xml (dentro de <manifest>)
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-feature android:name="android.hardware.location.gps" />
```

### Push Notifications (Firebase Cloud Messaging)
1. Firebase Console → Agregar app → **Android**, con el mismo `appId` de `capacitor.config.json` (co.edu.uao.sensores).
2. Descargar `google-services.json` y copiarlo en `android/app/`.
3. Correr la app, abrir "Push Notifications" y pulsar **Activar Push** → aparece el token.
4. Firebase → Messaging → Crear campaña → Notificaciones → **Enviar mensaje de prueba** → pegar el token.

## Estructura
```
src/
  sensors.js                  lista de sensores (el Home crea un botón por cada uno)
  hooks/                      un custom hook por sensor (useGeolocation, useCamera, useAccelerometer,
                              useDevice, useHaptics, useFilesystem, useLocalNotifications, usePushNotifications)
  components/SensorPage.jsx   layout común (título + botón volver)
  pages/                      Home + una página por sensor
  App.jsx                     rutas
```
