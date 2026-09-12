const SESSION_KEY = 'mediclinic_doctor_session';

const DOCTORS = [
  { username: 'dr.garcia', password: 'medico123', name: 'Dr. Carlos García', specialty: 'Medicina General' },
  { username: 'dr.lopez', password: 'medico456', name: 'Dra. Ana López', specialty: 'Pediatría' },
];

export interface DoctorSession {
  username: string;
  name: string;
  specialty: string;
}

export function login(username: string, password: string): DoctorSession | null {
  const doctor = DOCTORS.find(
    (d) => d.username === username.trim() && d.password === password
  );
  if (!doctor) return null;

  const session: DoctorSession = {
    username: doctor.username,
    name: doctor.name,
    specialty: doctor.specialty,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): DoctorSession | null {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
