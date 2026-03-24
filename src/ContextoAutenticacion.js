import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // <- IMPORTACIÓN CORRECTA

const ContextoAutenticacion = createContext();

export const useAutenticacion = () => useContext(ContextoAutenticacion);

export const ProveedorAutenticacion = ({ hijos }) => {
    const [usuario, establecerUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            establecerUsuario(JSON.parse(usuarioGuardado));
        }
        
        window.manejarRespuestaCredencial = (respuesta) => {
            iniciarSesion(respuesta.credencial);
        };
    }, []);

    const iniciarSesion = (token) => {
        try {
            
            const decodificado = jwtDecode(token);
            
            console.log('Token decodificado:', decodificado);
            
            const datosUsuario = {
                nombre: decodificado.name || decodificado.nombre,
                correo: decodificado.email || decodificado.correo,
                foto: decodificado.picture || decodificado.foto
            };
            
            console.log('Datos usuario:', datosUsuario);
            
            establecerUsuario(datosUsuario);
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
        } catch (error) {
            console.error('Error decodificando JWT:', error);
            console.error('Token que causó error:', token ? token.substring(0, 50) + '...' : 'Token vacío');
        }
    };

    const cerrarSesion = () => {
        establecerUsuario(null);
        localStorage.removeItem('usuario');
        if (window.google) {
            window.google.accounts.id.deshabilitarSeleccionAutomatica();
        }
    };

    return (
        <ContextoAutenticacion.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {hijos}
        </ContextoAutenticacion.Provider>
    );
};