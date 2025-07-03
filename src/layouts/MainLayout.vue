<template>
  <div class="container-mainlayout">
    <Header/>
    <Sidebar/>
    <main :style="{paddingLeft: paddingLeft}" class="main-layout">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import { useSidebarStore } from '@/store/sidebar.js';
import { computed, onMounted, watch } from 'vue';
import { useUsuarioStore } from '@/store/usuario.js'
import { useRouter } from 'vue-router';

let sidebarStore = useSidebarStore();
let paddingLeft=computed(()=>sidebarStore.tamanioSidebar);

let authStore = useUsuarioStore();
let router = useRouter();
onMounted(async()=> {
  await authStore.cargarUsuario()
  if (!authStore.usuario) {
    console.log("siii")
    // Si no está autenticado, redirige al login
    router.push({ name: 'login' });
  }
})

// Observa cambios en usuario para reaccionar si se desloguea o expira el token
watch(
  () => authStore.usuario,
  (nuevoUsuario) => {
    if (!nuevoUsuario) {
      router.push({ name: 'login' })
    }
  }
)
</script>

<style scoped>
.container-mainlayout{
    width: 100%;
    min-height: 100vh;
    /* border: 2px solid blue; */
  }
  .main-layout{
    padding-top: 83px;
    transition: padding-left 0.3s ease;
    display: flex;
    /* border: 2px solid red; */
    min-height: 100vh;
    width: 100%
  }
  @media (max-width: 620px) {
    .main-layout{
      padding-left: 50px !important;
    }
  }

</style>
