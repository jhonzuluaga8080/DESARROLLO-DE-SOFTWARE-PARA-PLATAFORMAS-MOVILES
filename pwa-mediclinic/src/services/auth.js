const SESSION_KEY = 'mediclinic_session';

const USERS = [
  { username: 'admin', password: 'admin123', name: 'Administrador' },
  { username: 'recepcion', password: 'recep2024', name: 'Recepción' },
];

export function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username.trim() && u.password === password
  );
  if (!user) return null;

  const session = { username: user.username, name: user.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
