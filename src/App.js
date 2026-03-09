import React, { useEffect } from 'react';
import { useAutenticacion } from './ContextoAutenticacion';  
import TableroKanban from './TableroKanban';
import './App.css';

function App() {
    const { usuario, iniciarSesion } = useAutenticacion(); 

    useEffect(() => {
        if (!usuario && window.google) {
            window.google.accounts.id.inicializar({
                cliente_id: '538772040608-7897bpl35mn24h5lavijchb7mdcam0m9.apps.googleusercontent.com',
                callback: (respuesta) => {
                    iniciarSesion(respuesta.credencial);
                },
                seleccion_automatica: true,
                cancelar_al_tocar_fuera: false
            });

            window.google.accounts.id.solicitar((notificacion) => {
                if (notificacion.noSeMuestra() || notificacion.seOmitioMomento()) {
                    console.log('One Tap no mostrado');
                }
            });
        }
    }, [usuario, iniciarSesion]);

    return (
        <div className="Aplicacion">
            {usuario ? (
                <TableroKanban />
            ) : (
                <div className="contenedor-inicio-sesion">
                    <h2>Inicia sesión para acceder al Tablero Kanban</h2>
                    <div id="carga_id_google"
                        data-cliente_id="538772040608-7897bpl35mn24h5lavijchb7mdcam0m9.apps.googleusercontent.com"
                        data-contexto="iniciar_sesion"
                        data-ux_modo="emergente"
                        data-callback="manejarRespuestaCredencial"
                        data-solicitud_automatica="true">
                    </div>
                    <div className="inicio_sesion_id_google"
                        data-tipo="estandar"
                        data-forma="rectangular"
                        data-tema="contorno"
                        data-texto="iniciar_sesion_con"
                        data-tamano="grande"
                        data-alineacion_logo="izquierda">
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;