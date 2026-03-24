import React from 'react';
import { useAutenticacion } from './ContextoAutenticacion';
import Perfil from './componentes/Perfil';
import FormularioTarea from './componentes/FormularioTarea';
import './TableroKanban.css';

const TableroKanban = () => {
    const { usuario } = useAutenticacion();  

    return (
        <div className="contenedor-kanban">
            <Perfil />
            <h1>Tablero Kanban</h1>
            <FormularioTarea usuarioActual={usuario} />
            <div className="columnas-kanban">
                <div className="columna">
                    <h2>Por Hacer</h2>
                    <div className="tareas">
                        {/* Tareas irán aquí */}
                    </div>
                </div>
                <div className="columna">
                    <h2>En Progreso</h2>
                    <div className="tareas">
                        {/* Tareas irán aquí */}
                    </div>
                </div>
                <div className="columna">
                    <h2>Completado</h2>
                    <div className="tareas">
                        {/* Tareas irán aquí */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableroKanban;