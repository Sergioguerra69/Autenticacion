# Kanban Board con Autenticación Google One Tap

## Descripción
Proyecto educativo que implementa un tablero Kanban funcional con autenticación mediante Google One Tap. Desarrollado con Vue.js 3 como parte de la asignatura DWEC (Desarrollo Web en Entorno Cliente).

## Características Implementadas

### Autenticación
- **Google One Tap**: Inicio de sesión con un solo clic
- **JWT Token Management**: Decodificación y gestión segura de tokens
- **Persistencia de Sesión**: Los usuarios permanecen logueados al recargar
- **Protección de Rutas**: El tablero solo es visible para usuarios autenticados

###  Tablero Kanban
- **Tres Columnas**: Por Hacer, En Progreso, Completado
- **Drag & Drop**: Mueve tareas entre columnas fácilmente
- **Gestión de Tareas**: Crear, eliminar y organizar tareas
- **Prioridades**: Alta, Media, Baja con indicadores visuales
- **Autor de Tareas**: Asignación automática del usuario autenticado

###  UI/UX
- **Diseño Moderno**: Interfaz limpia y profesional
- **Responsive**: Funciona en móviles y escritorio
- **Animaciones**: Transiciones suaves y feedback visual
- **Sin Emojis**: Versión profesional sin iconos emoji

##  Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Sergioguerra69/Autenticacion.git
cd DWEC_U07_A01_CPE_S_archivos

# Instalar dependencias
npm install

# Iniciar aplicación
npm start
# o
npm run serve
```

### Configuración de Google Cloud
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Configura la Pantalla de Consentimiento de OAuth
4. Crea un ID de Cliente OAuth 2.0
5. Añade orígenes autorizados:
   - `http://localhost:8080`
   - `http://127.0.0.1:8080`
6. Actualiza el `client_id` en `src/App.vue`

##  Estructura del Proyecto

```
src/
├── contexts/
│   └── AuthContext.js          # Gestión global de autenticación
├── kanban-components/
│   ├── KanbanBoard.vue         # Tablero principal
│   ├── KanbanColumn.vue        # Columnas del kanban
│   └── TaskCard.vue           # Tarjetas de tareas
├── components/
│   ├── GoogleSignIn.vue        # Botón alternativo de login
│   ├── Login.vue              # Interfaz de login
│   └── Profile.vue           # Vista de perfil
├── App.vue                   # Componente principal con Google One Tap
└── main.js                  # Punto de entrada
```

## Tecnologías Utilizadas

- **Vue.js 3**: Framework frontend principal
- **Google One Tap API**: Autenticación social
- **JWT Decode**: Decodificación de tokens
- **LocalStorage**: Persistencia de sesión
- **Vue CLI**: Herramientas de desarrollo

##  Requisitos Cumplidos

###  Requisito Práctico 1: Implementación de Autenticación
- [x] Configuración de credenciales Google
- [x] AuthContext con estado global `user`
- [x] Uso de `jwt-decode` para procesar respuesta
- [x] Integración de Google One Tap en App.vue
- [x] Componente de perfil con foto y nombre

###  Requisito Práctico 2: Sincronización y Seguridad
- [x] Persistencia en localStorage
- [x] Reconocimiento automático al recargar
- [x] Protección de rutas del tablero Kanban
- [x] Asociación automática del autor en tareas

##  Acceso

La aplicación se ejecuta en: `http://localhost:8080`

##  Licencia
Proyecto educativo para la asignatura DWEC.

##  Autor
- **Sergio Guerra Sanchez**
- **Asignatura**: Desarrollo Web en Entorno Cliente
