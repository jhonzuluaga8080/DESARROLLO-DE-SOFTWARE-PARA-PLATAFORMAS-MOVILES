import { useState, useEffect } from 'react';
import { getSession } from './services/auth';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = getSession();
    setSession(savedSession);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!session) {
    return <Login onLoginSuccess={setSession} />;
  }

  return <Dashboard session={session} onLogout={() => setSession(null)} />;
}

export default App;
