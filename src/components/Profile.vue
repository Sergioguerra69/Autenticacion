<template>
  <div class="profile" v-if="userData">
    <h2>Perfil del Usuario</h2>
    
    <div class="profile-card">
      <div class="profile-header">
        <img :src="userData.picture" :alt="userData.name" class="profile-avatar">
        <div class="profile-info">
          <h3>{{ userData.name }}</h3>
          <p>{{ userData.email }}</p>
        </div>
      </div>
      
      <div class="profile-details">
        <div class="detail-item">
          <strong>ID de Google:</strong>
          <span>{{ userData.sub }}</span>
        </div>
        
        <div class="detail-item">
          <strong>Email verificado:</strong>
          <span>{{ userData.email_verified ? 'Sí' : 'No' }}</span>
        </div>
        
        <div class="detail-item">
          <strong>Autenticado en:</strong>
          <span>{{ new Date(userData.iat * 1000).toLocaleString() }}</span>
        </div>
        
        <div class="detail-item">
          <strong>Token expira:</strong>
          <span>{{ new Date(userData.exp * 1000).toLocaleString() }}</span>
        </div>
      </div>
      
      <div class="token-section">
        <h4>Token JWT (decodificado):</h4>
        <pre class="token-data">{{ formattedToken }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    userData: {
      type: Object,
      default: null
    }
  },
  computed: {
    formattedToken() {
      return JSON.stringify(this.userData, null, 2);
    }
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile h2 {
  color: #4285f4;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #4285f4;
  padding-bottom: 10px;
}

.profile-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #4285f4;
}

.profile-info h3 {
  margin: 0;
  color: #333;
  font-size: 1.5em;
}

.profile-info p {
  margin: 5px 0 0;
  color: #666;
}

.profile-details {
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item strong {
  color: #4285f4;
  font-weight: 600;
}

.detail-item span {
  color: #333;
  font-family: monospace;
  font-size: 0.9em;
}

.token-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.token-section h4 {
  color: #4285f4;
  margin-top: 0;
  margin-bottom: 10px;
}

.token-data {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 15px;
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 300px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>