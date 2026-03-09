import React from 'react';
import { useAutenticacion } from '../ContextoAutenticacion'; 
import './Perfil.css';

const Perfil = () => {
    const { usuario, cerrarSesion } = useAutenticacion();  

    if (!usuario) return null;

    return (
        <header className="encabezado-perfil">
            <div className="info-perfil">
                <img 
                    src={usuario.foto} 
                    alt={usuario.nombre}
                    className="foto-perfil"
                />
                <span className="nombre-perfil">{usuario.nombre}</span>
            </div>
            <button onClick={cerrarSesion} className="boton-cerrar-sesion">
                Cerrar Sesión
            </button>
        </header>
    );
};

export default Perfil;