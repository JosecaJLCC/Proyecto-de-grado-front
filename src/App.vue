<template>
  <div id="app-vue">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUsuarioStore } from '@/store/usuario.js'

let usuarioStore = useUsuarioStore();
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token, redirige al login
    router.push({ name: 'login' });
  } else {
    // Si hay token, carga el usuario
    usuarioStore.cargarUsuario()
  }
})
</script>


<style scoped>
  #app-vue{
    width: 100%;
    min-height: 100dvh;

    background-image: url('@/assets/background2.png');
    background-size: cover;
    background-position: center;

    background-repeat: no-repeat;
  }
</style>
