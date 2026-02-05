<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      <p class="login-description">Para acceder a la aplicación, necesitas autenticarte con tu cuenta de Google.</p>
      
      <div id="googleSignIn" class="google-signin-btn"></div>
      
      <div class="browser-info">
        <h4>Importante para pruebas:</h4>
        <p>
          <strong>⚠️ Usa Firefox para pruebas locales</strong><br>
          Chrome bloquea la autenticación en conexiones HTTP. 
          Para evitar errores, ejecuta esta aplicación en Firefox.
        </p>
      </div>
      
      <div class="one-tap-info">
        <h4>Sobre Google One Tap:</h4>
        <p>
          Esta aplicación usa Google One Tap, que muestra un cuadro flotante 
          para iniciar sesión con un solo clic si ya tienes sesión en Google.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    // Este método será llamado desde el padre para renderizar el botón
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.login-card h2 {
  color: #4285f4;
  margin-bottom: 15px;
}

.login-description {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.google-signin-btn {
  display: flex;
  justify-content: center;
  margin: 25px 0;
}

.browser-info {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin: 25px 0;
  text-align: left;
}

.browser-info h4 {
  color: #856404;
  margin-top: 0;
  margin-bottom: 10px;
}

.browser-info p {
  color: #856404;
  margin: 0;
  font-size: 0.9em;
  line-height: 1.5;
}

.one-tap-info {
  background-color: #e7f4ff;
  border: 1px solid #b3e0ff;
  border-radius: 8px;
  padding: 15px;
  margin-top: 25px;
  text-align: left;
}

.one-tap-info h4 {
  color: #0066cc;
  margin-top: 0;
  margin-bottom: 10px;
}

.one-tap-info p {
  color: #0066cc;
  margin: 0;
  font-size: 0.9em;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .login-card {
    padding: 25px 20px;
  }
}
</style>