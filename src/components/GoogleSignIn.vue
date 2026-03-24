<template>
  <div class="google-signin">
    <div id="google-signin-button"></div>
    <p class="signin-text">O usa el botón de arriba para iniciar sesión</p>
  </div>
</template>

<script>
export default {
  name: 'GoogleSignIn',
  mounted() {
    // Cargar Google Sign-In API
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      this.initializeGoogleSignIn()
    }
    document.head.appendChild(script)
  },
  methods: {
    initializeGoogleSignIn() {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '171265399724-rtbgpr7hikmi7vhs4o08vrus316h2b2e.apps.googleusercontent.com',
          callback: this.handleCredentialResponse
        })
        
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'filled_blue',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular'
          }
        )
      }
    },
    handleCredentialResponse(response) {
      this.$emit('success', response.credential)
    }
  }
}
</script>

<style scoped>
.google-signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.signin-text {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

#google-signin-button {
  display: flex;
  justify-content: center;
}
</style>
