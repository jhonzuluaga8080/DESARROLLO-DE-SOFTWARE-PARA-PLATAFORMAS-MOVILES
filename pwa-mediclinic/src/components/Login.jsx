import { useState } from 'react';
import { login } from '../services/auth';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const session = login(username, password);
    if (session) {
      onLoginSuccess(session);
    } else {
      setError('Credenciales incorrectas. Verifique usuario y contraseña.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/icons/icon.svg" alt="MediClinic" className="login-logo" />
        <h1>MediClinic</h1>
        <p className="login-subtitle">Administración de Pacientes</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin o recepcion"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-message" role="alert">{error}</p>}

          <button type="submit" className="btn-primary">Iniciar sesión</button>
        </form>

        <div className="login-hint">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>admin / admin123</p>
          <p>recepcion / recep2024</p>
        </div>
      </div>
    </div>
  );
}
