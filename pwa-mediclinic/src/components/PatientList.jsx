export default function PatientList({ patients }) {
  if (patients.length === 0) {
    return (
      <div className="empty-state">
        <p>No se encontraron pacientes.</p>
      </div>
    );
  }

  return (
    <ul className="patient-list">
      {patients.map((patient) => (
        <li key={patient.id} className="patient-card">
          <div className="patient-info">
            <h3>{patient.nombre} {patient.apellido}</h3>
            <p><span>CC:</span> {patient.cc}</p>
            {patient.telefono && <p><span>Tel:</span> {patient.telefono}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
