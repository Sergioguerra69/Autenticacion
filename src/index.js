import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProveedorAutenticacion } from './ContextoAutenticacion';
import './index.css';


function iniciarAplicacion() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('ERROR: No se encontró el elemento con id="root"');
    console.log('Reintentando en 100ms...');
    setTimeout(iniciarAplicacion, 100);
    return;
  }
  
  console.log(' Root encontrado, montando React...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ProveedorAutenticacion>
          <App />
        </ProveedorAutenticacion>
      </React.StrictMode>
    );
    
    console.log('✅ React montado correctamente');
  } catch (error) {
    console.error('❌ Error al montar React:', error);
  }
}

if (document.readyState === 'loading') {

  document.addEventListener('DOMContentLoaded', iniciarAplicacion);
} else {
 
  iniciarAplicacion();
}


setTimeout(iniciarAplicacion, 1000);