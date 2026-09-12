# MediClinic — Parcial 1

Proyecto del curso **Desarrollo de Software para Plataformas Móviles** (UAO).

Contiene dos aplicaciones independientes para la clínica **MediClinic**:

| App | Carpeta | Tecnología | Propósito |
|-----|---------|------------|-----------|
| PWA Pacientes | `pwa-mediclinic/` | React + Vite + Service Worker | Administración de pacientes (recepción) |
| App Médicos | `ionic-mediclinic/` | Ionic React + Tabs | Consulta y gestión de visitas médicas |

> Las aplicaciones **no comparten datos**. Cada una usa su propio `localStorage`.

---

## Estructura del repositorio

```
├── pwa-mediclinic/       # Ejercicio 1 — PWA React
├── ionic-mediclinic/     # Ejercicio 2 — Ionic React
├── screenshots/          # Capturas de pantalla
└── README.md
```

---

## Ejercicio 1 — PWA React (`pwa-mediclinic`)

### Funcionalidades

- **Login** con usuarios fijos, sesión en `localStorage`, recuperación al recargar y cierre de sesión.
- **Pacientes**: listado, formulario de registro (nombre, apellido, CC, teléfono) con validación.
- **Búsqueda** por nombre, apellido o CC (estado en componente padre, lista filtrada en hijo).
- **PWA**: `manifest.json`, `service-worker.js` con estrategia híbrida (según clase 02).

### Usuarios de prueba

| Usuario | Contraseña |
|---------|------------|
| `admin` | `admin123` |
| `recepcion` | `recep2024` |

### Ejecutar en desarrollo

```bash
cd pwa-mediclinic
npm install
npm run dev
```

Abrir `http://localhost:5173`

### Build de producción

```bash
npm run build
npm run preview
```

### Instalar como PWA en el celular

1. Desplegar la carpeta `dist/` en un hosting HTTPS (Netlify, Vercel, GitHub Pages, etc.).
2. Abrir la URL en Chrome (Android) o Safari (iOS).
3. **Android**: Menú ⋮ → *Instalar aplicación* o *Agregar a pantalla de inicio*.
4. **iOS**: Compartir → *Agregar a pantalla de inicio*.

### Estrategia del Service Worker (híbrida)

| Recurso | Estrategia |
|---------|------------|
| HTML | Network First |
| JS / CSS | Cache First |
| Imágenes | Stale While Revalidate |
| Otros | Network First |

---

## Ejercicio 2 — Ionic React (`ionic-mediclinic`)

### Funcionalidades

- **Login** con componentes Ionic e `IonToast` en credenciales incorrectas.
- **IonTabs**: Visitas, Pacientes, Perfil.
- **Visitas del día** con paciente, hora y estado.
- **Detalle de visita** con cambio de estado: `pendiente` → `en_camino` → `finalizada`.
- Persistencia en `localStorage`.

### Usuarios de prueba

| Usuario | Contraseña |
|---------|------------|
| `dr.garcia` | `medico123` |
| `dr.lopez` | `medico456` |

### Ejecutar en desarrollo

```bash
cd ionic-mediclinic
npm install
npm run dev
```

Abrir `http://localhost:5173`

### Build

```bash
npm run build
```

### Ejecutar en Android (opcional)

Requisitos: Android Studio, Java 17, modo desarrollador en el dispositivo.

```bash
ionic cap run android
```

---

## Capturas de pantalla

Las capturas se encuentran en la carpeta `screenshots/`:

- `pwa-login.png` — Login PWA
- `pwa-pacientes.png` — Lista y formulario de pacientes
- `pwa-busqueda.png` — Búsqueda de pacientes
- `ionic-login.png` — Login Ionic
- `ionic-visitas.png` — Tab de visitas del día
- `ionic-detalle.png` — Detalle de visita con cambio de estado
- `ionic-perfil.png` — Tab de perfil

---

## Rama de entrega

```bash
git checkout -b parcial-1-nombre-apellido
```

Reemplazar `nombre-apellido` con tu nombre real antes de entregar.

---

## Autor

Estudiante — Desarrollo de Software para Plataformas Móviles  
Universidad Autónoma de Occidente (UAO)
