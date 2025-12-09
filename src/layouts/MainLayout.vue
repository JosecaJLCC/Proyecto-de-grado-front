<template>
  <div class="container-mainlayout">
    <Sidebar class="sidebar-layout"/>
    <main :style="{ paddingLeft: paddingLeft }" class="main-layout">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'

import { useSidebarStore } from '@/store/sidebar.js'
import { computed, onMounted, watch } from 'vue'
import { useUsuarioStore } from '@/store/usuario.js'
import { useRouter } from 'vue-router'

let sidebarStore = useSidebarStore()
let paddingLeft = computed(() => sidebarStore.tamanioSidebar)

let authStore = useUsuarioStore()
let router = useRouter()
onMounted(async () => {
  await authStore.cargarUsuario()
  if (!authStore.usuario) {
    // Si no está autenticado, redirige al login
    router.push({ name: 'login' })
  }
})

// Observa cambios en usuario para reaccionar si se desloguea o expira el token
watch(
  () => authStore.usuario,
  (nuevoUsuario) => {
    if (!nuevoUsuario) {
      router.push({ name: 'login' })
    }
  },
)
</script>

<style scoped>
.container-mainlayout {
  width: 100%;
  min-height: 100dvh;
}

.sidebar-layout{
  height: 15dvh;
}
.main-layout {
  transition: padding-left 0.3s ease;
  background-image: url('@/assets/background5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  height: 85dvh;
  width: 100%;
}
@media (max-width: 620px) {
  .main-layout {
    padding-left: 0px !important;
  }
}
</style>
