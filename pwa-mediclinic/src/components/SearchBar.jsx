export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Buscar paciente</label>
      <input
        id="search"
        type="search"
        placeholder="Nombre, apellido o cédula..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
