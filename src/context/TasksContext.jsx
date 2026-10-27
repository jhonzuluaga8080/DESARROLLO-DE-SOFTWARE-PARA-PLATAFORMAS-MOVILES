import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useTasksCollection } from '../hooks/useTasksCollection';

// Contexto 2: datos de las tareas compartidos entre todas las páginas
const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const { user } = useAuth(); // este provider debe ir DENTRO de AuthProvider
  const tasksData = useTasksCollection(user?.uid);
  return <TasksContext.Provider value={tasksData}>{children}</TasksContext.Provider>;
};

export const useTasks = () => useContext(TasksContext);
