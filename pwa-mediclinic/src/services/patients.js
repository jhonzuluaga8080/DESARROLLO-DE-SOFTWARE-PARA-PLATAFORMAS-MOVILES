const PATIENTS_KEY = 'mediclinic_patients';

export function getPatients() {
  const data = localStorage.getItem(PATIENTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function savePatients(patients) {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}

export function addPatient(patient) {
  const patients = getPatients();
  const newPatient = {
    id: crypto.randomUUID(),
    ...patient,
    createdAt: new Date().toISOString(),
  };
  const updated = [...patients, newPatient];
  savePatients(updated);
  return newPatient;
}

export function validatePatient({ nombre, apellido, cc }) {
  const errors = {};

  if (!nombre.trim() || nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
    errors.nombre = 'El nombre solo puede contener letras';
  }

  if (!apellido.trim() || apellido.trim().length < 2) {
    errors.apellido = 'El apellido debe tener al menos 2 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido.trim())) {
    errors.apellido = 'El apellido solo puede contener letras';
  }

  if (!cc.trim()) {
    errors.cc = 'La cédula es obligatoria';
  } else if (!/^\d{6,12}$/.test(cc.trim())) {
    errors.cc = 'La cédula debe contener entre 6 y 12 dígitos';
  }

  return errors;
}
