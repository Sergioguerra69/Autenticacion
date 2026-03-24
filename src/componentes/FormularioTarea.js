import React, { useState } from 'react';
import './FormularioTarea.css';

const FormularioTarea = ({ usuarioActual }) => {
    const [tarea, establecerTarea] = useState('');

    const manejarEnvio = (evento) => {
        evento.preventDefault();
        if (tarea.trim() === '') return;
        
        const nuevaTarea = {
            id: Date.now(),
            texto: tarea,
            autor: usuarioActual ? usuarioActual.nombre : 'Anónimo',
            correoAutor: usuarioActual ? usuarioActual.correo : '',
            marcaTiempo: new Date().toLocaleString(),
            estado: 'por_hacer'
        };
        
        console.log('Nueva tarea:', nuevaTarea);
        establecerTarea('');
    };

    return (
        <form onSubmit={manejarEnvio} className="formulario-tarea">
            <input 
                type="text" 
                value={tarea} 
                onChange={(evento) => establecerTarea(evento.target.value)} 
                placeholder="Escribe una nueva tarea..." 
                className="entrada-tarea"
            />
            <button type="submit" className="enviar-tarea">
                Agregar Tarea
            </button>
            {usuarioActual && (
                <div className="autor-tarea">
                    <small>Tarea será creada por: <strong>{usuarioActual.nombre}</strong></small>
                </div>
            )}
        </form>
    );
};

export default FormularioTarea;