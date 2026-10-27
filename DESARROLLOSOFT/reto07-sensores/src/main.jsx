import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App';

// Permite probar la cámara en el navegador (en el celular no hace falta)
defineCustomElements(window);

createRoot(document.getElementById('root')).render(<App />);
