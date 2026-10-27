import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';

// AuthProvider por fuera: TasksProvider necesita saber quién es el usuario
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TasksProvider>
      <App />
    </TasksProvider>
  </AuthProvider>
);
