# Reto 06 – Contactos (Firestore) · Tareas (Realtime DB) · Frutas (Dexie) + estado de red

## Correr
```
npm install
npm run dev
```
Abre http://localhost:5173

## Configurar Firebase
1. Authentication → habilitar **Correo/contraseña**.
2. **Firestore**: crear base de datos y publicar estas reglas:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{id} {
      allow read, update, delete: if request.auth != null
                                  && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
    }
  }
}
```
3. **Realtime Database**: crearla (modo bloqueado) y en la pestaña Reglas publicar:
```
{
  "rules": {
    "tasks": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```
4. Copiar la config web en `src/firebase/config.js`, incluyendo `databaseURL`
   (sale en la Realtime Database; en algunas regiones termina en `firebasedatabase.app`).

## Probar el modo sin conexión
Chrome → F12 → Network → marcar **Offline**. Contactos y Tareas se deshabilitan; Frutas sigue funcionando.
Al quitar Offline, todo se habilita de nuevo.

## Estructura
```
src/
  firebase/config.js              auth + Firestore + Realtime DB
  db/db.js                        Dexie (versión 1 y 2 de la tabla frutas)
  hooks/useFirebaseAuth.js        login / register / logout
  hooks/useCollection.js          CRUD Firestore
  hooks/useRealTimeCollection.js  CRUD Realtime DB con onValue
  hooks/useDexie.js               CRUD Dexie con useLiveQuery + searchByName (newFunction)
  hooks/useNetwork.js             @capacitor/network
  context/AuthContext.jsx         sesión
  components/OfflineBanner.jsx    aviso "sin conexión"
  pages/ Login Register Home Contacts Tasks Fruits
```
