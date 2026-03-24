import { reactive, computed } from 'vue'
import jwt_decode from 'jwt-decode'

// Estado global de autenticación
const state = reactive({
  user: null,
  token: null,
  isAuthenticated: false
})

// Cargar usuario desde localStorage al iniciar
const loadUserFromStorage = () => {
  const savedToken = localStorage.getItem('authToken')
  const savedUser = localStorage.getItem('userData')
  
  if (savedToken && savedUser) {
    try {
      state.token = savedToken
      state.user = JSON.parse(savedUser)
      state.isAuthenticated = true
      
      // Verificar si el token no ha expirado
      const decoded = jwt_decode(savedToken)
      const currentTime = Date.now() / 1000
      
      if (decoded.exp < currentTime) {
        logout()
      }
    } catch (error) {
      console.error('Error loading user from storage:', error)
      logout()
    }
  }
}

// Guardar usuario en localStorage
const saveUserToStorage = (token, userData) => {
  localStorage.setItem('authToken', token)
  localStorage.setItem('userData', JSON.stringify(userData))
}

// Iniciar sesión
const login = (token) => {
  try {
    const userData = jwt_decode(token)
    
    state.token = token
    state.user = userData
    state.isAuthenticated = true
    
    saveUserToStorage(token, userData)
    
    return userData
  } catch (error) {
    console.error('Error decoding token:', error)
    throw new Error('Token inválido')
  }
}

// Cerrar sesión
const logout = () => {
  state.user = null
  state.token = null
  state.isAuthenticated = false
  
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
}

// Getters computados
const getUser = computed(() => state.user)
const getToken = computed(() => state.token)
const getIsAuthenticated = computed(() => state.isAuthenticated)

// Inicializar el contexto
loadUserFromStorage()

export const useAuth = () => {
  return {
    user: getUser,
    token: getToken,
    isAuthenticated: getIsAuthenticated,
    login,
    logout,
    loadUserFromStorage
  }
}
