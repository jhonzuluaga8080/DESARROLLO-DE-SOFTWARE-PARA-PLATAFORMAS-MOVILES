import { useState } from 'react';
import { addPatient, validatePatient } from '../services/patients';

export default function PatientForm({ onPatientAdded }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', cc: '', telefono: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePatient(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newPatient = addPatient({
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      cc: form.cc.trim(),
      telefono: form.telefono.trim(),
    });

    setForm({ nombre: '', apellido: '', cc: '', telefono: '' });
    setErrors({});
    onPatientAdded(newPatient);
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Agregar paciente</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'input-error' : ''}
          />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido *</label>
          <input
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className={errors.apellido ? 'input-error' : ''}
          />
          {errors.apellido && <span className="field-error">{errors.apellido}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cc">Cédula (CC) *</label>
          <input
            id="cc"
            name="cc"
            value={form.cc}
            onChange={handleChange}
            className={errors.cc ? 'input-error' : ''}
          />
          {errors.cc && <span className="field-error">{errors.cc}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary">Registrar paciente</button>
    </form>
  );
}
