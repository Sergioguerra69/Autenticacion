const express = require('express');
const jwt = require('jsonwebtoken');
const aplicacion = express();

aplicacion.use(express.json());

const CLAVE_SECRETA = "clave_maestra_super_secreta";

// Ruta de login: genera token
aplicacion.post('/login', (solicitud, respuesta) => {
    const { nombreUsuario, contrasena } = solicitud.body;

    // Credenciales fijas para la práctica
    if (nombreUsuario === 'alumno' && contrasena === 'web2026') {
        // Crear token con información del usuario
        const token = jwt.sign(
            { usuario: nombreUsuario, rol: 'admin' },
            CLAVE_SECRETA,
            { expiresIn: '1h' }
        );
        respuesta.json({ token });
    } else {
        respuesta.status(401).send('Login fallido');
    }
});

// Ruta protegida: verifica token
aplicacion.get('/api/datos', (solicitud, respuesta) => {
    const cabeceraAutorizacion = solicitud.headers.authorization;

    if (!cabeceraAutorizacion) {
        return respuesta.status(403).send('Token requerido');
    }

    const token = cabeceraAutorizacion.split(' ')[1]; // Formato: "Bearer TOKEN"

    jwt.verify(token, CLAVE_SECRETA, (error, decodificado) => {
        if (error) {
            return respuesta.status(403).send('Token inválido');
        }
        respuesta.json({
            mensaje: "Acceso concedido",
            datos: [1, 2, 3]
        });
    });
});

aplicacion.listen(4000, () => {
    console.log('Servidor JWT escuchando en puerto 4000');
});