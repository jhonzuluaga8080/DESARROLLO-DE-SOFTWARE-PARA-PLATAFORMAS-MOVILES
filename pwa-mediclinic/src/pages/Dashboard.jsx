import { useState, useEffect, useMemo } from 'react';
import { logout } from '../services/auth';
import { getPatients } from '../services/patients';
import SearchBar from '../components/SearchBar';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';

export default function Dashboard({ session, onLogout }) {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return patients;

    return patients.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.apellido.toLowerCase().includes(term) ||
        p.cc.includes(term)
    );
  }, [patients, searchTerm]);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handlePatientAdded = () => {
    setPatients(getPatients());
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <img src="/icons/icon.svg" alt="MediClinic" className="header-logo" />
          <div>
            <h1>MediClinic</h1>
            <p>Bienvenido, {session.name}</p>
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="dashboard-content">
        <PatientForm onPatientAdded={handlePatientAdded} />

        <section className="patients-section">
          <h2>Lista de pacientes ({filteredPatients.length})</h2>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <PatientList patients={filteredPatients} />
        </section>
      </main>
    </div>
  );
}
