<template>
  <div>
    <h1>Datos de usuario</h1>
    <div v-if="datosUsuario">
      <dl>
        <dt>Nombre:</dt>
        <dd>{{datosUsuario.name}}</dd>
        <dt>Email:</dt>
        <dd>{{datosUsuario.email}}</dd>
        <dt>Imagen:</dt>
        <dd><img alt="" :src="datosUsuario.picture"/></dd>
      </dl>
    </div>
    <h1>Token</h1>
    <div>
      {{ tokenJWT }}
    </div>
  </div>
</template>

<script>
  // Importación de las librerías
  import googleOneTap from 'google-one-tap';
  import jwt_decode from "jwt-decode";

  export default {
      name: 'App',
      data: function() {
          return {
              // Variables de datos
              tokenJWT: null,
              datosUsuario: null
          }
      },
      mounted() {
          // Opciones
          const options = {
              // Introducir aquí el ID de cliente de la clave creada en la consola de Google
              client_id: '538772040608-7897bpl35mn24h5lavijchb7mdcam0m9.apps.googleusercontent.com'
          };
          // Se añade el componente de autenticación de Google One Tab
          googleOneTap(options, (response) => {
              // Callback que se ejecuta cuando finaliza el proceso de autenticación
              // 'response' almacena un objeto que incluye el token JWT en la propiedad 'credential'

              // Se almacena el token en la variable de estado 'tokenJWT'
              this.tokenJWT = response.credential;

              // Se decodifica el token mediante la librería 'jwt-decode'
              // El resultado es un objeto que almacena la información de la persona autenticada
              // Se almacena dicho objeto en la variable de estado 'datosUsuario'
              this.datosUsuario = jwt_decode(response.credential);
          });
      },
  }
</script>

<style>
</style>
