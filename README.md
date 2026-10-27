# Reto 05 – Tasks App con Firebase (Login/Register, Contextos y Custom Hooks)

## Correr el proyecto
```
npm install
npm run dev
```
Se abre en http://localhost:5173

## Configurar Firebase
1. Authentication → Sign-in method → habilitar **Correo/contraseña**.
2. Firestore Database → Crear base de datos (modo producción).
3. Firestore → Reglas → pegar y **Publicar**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null
                                  && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
    }
  }
}
```
4. Copiar la config web de tu app en `src/firebase/config.js`.

## Estructura
```
src/
  firebase/config.js            → initializeApp, auth, db
  hooks/useFirebaseAuth.js      → lógica de Firebase Auth (login, register, logout, sesión)
  hooks/useTasksCollection.js   → lógica de Firestore (CRUD + tiempo real)
  context/AuthContext.jsx       → Contexto 1: login / register / logout
  context/TasksContext.jsx      → Contexto 2: datos de las tareas
  pages/Login.jsx  Register.jsx  TasksList.jsx  TaskForm.jsx (agregar/editar)  TaskDetail.jsx
  App.jsx                       → rutas (públicas y privadas)
  main.jsx                      → AuthProvider > TasksProvider > App
```
