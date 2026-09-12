const VISITS_KEY = 'mediclinic_visits';

export type VisitStatus = 'pendiente' | 'en_camino' | 'finalizada';

export interface Visit {
  id: string;
  paciente: string;
  hora: string;
  estado: VisitStatus;
  direccion: string;
  motivo: string;
  fecha: string;
}

const DEFAULT_VISITS: Visit[] = [
  {
    id: '1',
    paciente: 'María Fernández',
    hora: '08:00',
    estado: 'pendiente',
    direccion: 'Calle 10 #25-30',
    motivo: 'Control post-operatorio',
    fecha: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    paciente: 'Juan Pérez',
    hora: '09:30',
    estado: 'pendiente',
    direccion: 'Carrera 15 #40-12',
    motivo: 'Consulta general',
    fecha: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    paciente: 'Laura Gómez',
    hora: '11:00',
    estado: 'en_camino',
    direccion: 'Av. 6N #28-45',
    motivo: 'Seguimiento diabetes',
    fecha: new Date().toISOString().split('T')[0],
  },
  {
    id: '4',
    paciente: 'Roberto Silva',
    hora: '14:00',
    estado: 'pendiente',
    direccion: 'Calle 5 #18-22',
    motivo: 'Revisión medicamentos',
    fecha: new Date().toISOString().split('T')[0],
  },
  {
    id: '5',
    paciente: 'Carmen Ruiz',
    hora: '16:30',
    estado: 'finalizada',
    direccion: 'Carrera 9 #33-10',
    motivo: 'Control presión arterial',
    fecha: new Date().toISOString().split('T')[0],
  },
];

export function getVisits(): Visit[] {
  const data = localStorage.getItem(VISITS_KEY);
  if (!data) {
    localStorage.setItem(VISITS_KEY, JSON.stringify(DEFAULT_VISITS));
    return DEFAULT_VISITS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_VISITS;
  }
}

export function saveVisits(visits: Visit[]): void {
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
}

export function getTodayVisits(): Visit[] {
  const today = new Date().toISOString().split('T')[0];
  return getVisits().filter((v) => v.fecha === today);
}

export function getVisitById(id: string): Visit | undefined {
  return getVisits().find((v) => v.id === id);
}

export function updateVisitStatus(id: string, estado: VisitStatus): Visit | null {
  const visits = getVisits();
  const index = visits.findIndex((v) => v.id === id);
  if (index === -1) return null;

  visits[index] = { ...visits[index], estado };
  saveVisits(visits);
  return visits[index];
}

export function getNextStatus(current: VisitStatus): VisitStatus | null {
  const flow: Record<VisitStatus, VisitStatus | null> = {
    pendiente: 'en_camino',
    en_camino: 'finalizada',
    finalizada: null,
  };
  return flow[current];
}

export function getStatusLabel(status: VisitStatus): string {
  const labels: Record<VisitStatus, string> = {
    pendiente: 'Pendiente',
    en_camino: 'En camino',
    finalizada: 'Finalizada',
  };
  return labels[status];
}

export function getStatusColor(status: VisitStatus): string {
  const colors: Record<VisitStatus, string> = {
    pendiente: 'warning',
    en_camino: 'primary',
    finalizada: 'success',
  };
  return colors[status];
}
