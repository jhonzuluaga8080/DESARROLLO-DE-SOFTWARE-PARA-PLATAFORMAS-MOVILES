# Parcial 2 – App de Misiones (Ionic + React + Capacitor + Firebase)

## 1. Instalar dependencias (en tu proyecto Ionic React)
```
npm install firebase @capacitor/camera @capacitor/geolocation @capacitor/haptics @capacitor/motion @capacitor/local-notifications
npx cap sync
```
Copia la carpeta `src/` de este zip sobre la de tu proyecto (reemplaza App.jsx y main.jsx;
si tu proyecto usa main.tsx / App.tsx, bórralos para no tener duplicados).

## 2. Firebase (consola)
1. Authentication → Sign-in method → habilitar **Correo/contraseña**.
2. Firestore Database → Crear base de datos.
3. Firestore → Reglas → pegar y publicar:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
4. Copia tu config web en `src/firebase/config.js`.

## 3. Permisos Android (android/app/src/main/AndroidManifest.xml, dentro de <manifest>)
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-feature android:name="android.hardware.location.gps" />
```

## 4. Correr en el celular (los sensores no funcionan bien en el navegador)
```
npm run build
npx cap sync android
npx cap run android
```
