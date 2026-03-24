const express = require('express');
const aplicacion = express();

aplicacion.get('/protegido', (solicitud, respuesta) => {
    const cabeceraAutorizacion = solicitud.headers.authorization;

    // Si no hay cabecera, pedimos autenticación
    if (!cabeceraAutorizacion) {
        respuesta.setHeader('WWW-Authenticate', 'Basic');
        return respuesta.status(401).send('Acceso denegado: Se requiere autenticación');
    }

    // Decodificar la credencial (formato: "Basic base64(usuario:contraseña)")
    const credencialCodificada = cabeceraAutorizacion.split(' ')[1];
    const credencialDecodificada = Buffer.from(credencialCodificada, 'base64').toString();
    const [usuario, contrasena] = credencialDecodificada.split(':');

    // Validar credenciales
    if (usuario === 'admin' && contrasena === '1234') {
        respuesta.send('¡Bienvenido al recurso protegido #1!');
    } else {
        respuesta.status(401).send('Credenciales incorrectas');
    }
});

aplicacion.listen(3000, () => {
    console.log('Servidor Basic Auth escuchando en puerto 3000');
});