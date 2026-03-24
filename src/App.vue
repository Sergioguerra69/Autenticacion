<template>
  <div id="app">
    <!-- Header con información del usuario -->
    <header class="app-header" v-if="isAuthenticated">
      <div class="user-info">
        <img :src="user.picture" :alt="user.name" class="user-avatar">
        <span class="user-name">{{ user.name }}</span>
        <button @click="logout" class="logout-btn">Cerrar Sesión</button>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="main-content">
      <!-- Mensaje de login requerido -->
      <div v-if="!isAuthenticated" class="login-required">
        <div class="login-card">
          <h1>Kanban Board</h1>
          <p>Para acceder al tablero Kanban, necesitas iniciar sesión con tu cuenta de Google.</p>
          
          <div class="login-info">
            <p>La ventana de Google One Tap aparecerá automáticamente</p>
            <p>Si no aparece, refresca la página</p>
          </div>
        </div>
      </div>

      <!-- Tablero Kanban (solo visible si está autenticado) -->
      <KanbanBoard v-else />
    </main>
  </div>
</template>

<script>
  // Importación de las librerías
  import googleOneTap from 'google-one-tap';
  import { useAuth } from './contexts/AuthContext';
  import KanbanBoard from './kanban-components/KanbanBoard.vue';

  export default {
      name: 'App',
      components: {
        KanbanBoard
      },
      setup() {
        const { user, isAuthenticated, login, logout } = useAuth();
        
        return {
          user,
          isAuthenticated,
          login,
          logout
        };
      },
      mounted() {
        console.log('App mounted - isAuthenticated:', this.isAuthenticated);
        
        // Solo inicializar Google One Tap si no está autenticado
        if (!this.isAuthenticated) {
          console.log('Inicializando Google One Tap...');
          
          // Cargar el script de Google si no está cargado
          if (!window.google) {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
              console.log('Script de Google cargado');
              this.initializeGoogleOneTap();
            };
            script.onerror = () => {
              console.error('Error al cargar script de Google');
            };
            document.head.appendChild(script);
          } else {
            this.initializeGoogleOneTap();
          }
        }
      },
      methods: {
        initializeGoogleOneTap() {
          console.log('Inicializando Google One Tap...');
          
          // Opciones para Google One Tap
          const options = {
            // Introducir aquí el ID de cliente de la clave creada en la consola de Google
            client_id: '171265399724-rtbgpr7hikmi7vhs4o08vrus316h2b2e.apps.googleusercontent.com',
            auto_select: false,
            cancel_on_tap_outside: false
          };
          
          // Se añade el componente de autenticación de Google One Tap
          googleOneTap(options, (response) => {
            // Callback que se ejecuta cuando finaliza el proceso de autenticación
            // 'response' almacena un objeto que incluye el token JWT en la propiedad 'credential'
            
            try {
              // Se usa el método login del contexto para procesar el token
              this.login(response.credential);
              console.log('Usuario autenticado correctamente');
            } catch (error) {
              console.error('Error en la autenticación:', error);
            }
          });
        }
      }
  }
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  font-size: 1rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.login-required {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.login-card h1 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.login-card p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.login-info {
  background: #f8f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #667eea;
}

.login-info p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }
  
  .user-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .login-card h1 {
    font-size: 2rem;
  }
}
</style>
