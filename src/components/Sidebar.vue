<template>
  <div>
    <header class="header-sidebar">
      <!-- <transition name="fade"> -->
      <transition name="fade" mode="out-in">
        <svg v-if="cambioIcon" v-on:click="mostrarSidebar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          <svg v-else v-on:click="mostrarSidebar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2 icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
      </transition>

      <h3 class="title-sidebar">
        SOFTWARE DE CONTROL DE PREVENCION DEL USO INDEBIDO DEL SISTEMA UNICO DE SALUD
      </h3>
      <section class="user-sidebar">
        <div class="profile-section">
          <img class="img-profile" :src="`${apiBaseUrl}/uploads/${perfil}`" alt="" />
        </div>
        <div class="dropdown-header">
          <svg v-if="mostrarDropDown" @click="desplegarDropDown" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-caret-up icon-sidebar desplegar-dropdown"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" /></svg>
          <svg v-else @click="desplegarDropDown" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-caret-down icon-sidebar desplegar-dropdown"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
          <div v-show="mostrarDropDown" class="dropdown-header-content">
            <p>{{ nombre_usuario }}</p>
            <p>{{ nombre_rol }}</p>
            <p>{{ nombre_establecimiento }}</p>
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
              <span>Actualizar perfil</span>
            </a>
            <a href="" v-on:click="cerrarSesion">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-power"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
              <span>Cerrar sesión</span>
            </a>
          </div>
        </div>
      </section>
    </header>
    <!-- hasta aca puedo volver borrando lo que hice -->
    <div class="sidebar" :style="{ width: tamanioSidebar }">
      <section class="section-logo-sidebar">
        <img
          src="../assets/CapacabanaLogo.png"
          alt=""
          class="logo-sidebar"
          :style="{ width: tamanioLogo, height: tamanioLogo }"
        />
        <!-- <h3 v-if="mostrarTitulo">"{{ establecimiento }}"</h3> -->
      </section>

      <nav class="nav-sidebar">
        <ul>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'inicio' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-home icon-sidebar"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <span>En atención</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'nuevo-registro' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-file-plus icon-sidebar"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11l0 6" />
                <path d="M9 14l6 0" />
              </svg>
              <span>Pacientes</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'historial-personal' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-first-aid-kit icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M4 8m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M10 14h4" /><path d="M12 12v4" /></svg>
              <span>Personal</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'historial-usuario' }">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-users icon-sidebar"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <span>Usuarios</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'historial-establecimiento' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-medical-cross icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z" /></svg>
              <span>Establecimientos</span>
            </RouterLink>
          </li>
          <!-- <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'historial-microred' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-building-hospital icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /><path d="M10 9l4 0" /><path d="M12 7l0 4" /></svg>
              <span>Microred</span>
            </RouterLink>
          </li> -->
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'reportes' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chart-dots icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3v18h18" /><path d="M9 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10.16 10.62l2.34 2.88" /><path d="M15.088 13.328l2.837 -4.586" /></svg>
              <span>Reportes</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="routes-sidebar" :to="{ name: 'auditoria' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-shield-half icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.998 2l.032 .002l.086 .005a1 1 0 0 1 .342 .104l.105 .062l.097 .076l.016 .015l.247 .21a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.791 -2.75l.046 -.036l.053 -.041a1 1 0 0 1 .217 -.112l.075 -.023l.036 -.01a1 1 0 0 1 .12 -.022l.086 -.005zm.002 2.296l-.176 .135a13 13 0 0 1 -7.288 2.572l-.264 .006l-.064 .31a11 11 0 0 0 1.064 7.175l.17 .314a11 11 0 0 0 6.49 5.136l.068 .019z" /></svg>
              <span>Auditoria</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
/* Para cambio de rutas cuando se cierra cesion */
let router = useRouter()
/* uso de variables globales con pinia */
import { useSidebarStore } from '@/store/sidebar.js'
/* fsdgfhghdsdfgfghkjhgsfdffghjkj */
let sidebarStore = useSidebarStore()
/* el ancho del div del sidebar */
let tamanioSidebar = computed(() => sidebarStore.tamanioSidebar)
let cambioIcon = computed(() => sidebarStore.cambioIcon)
/* el ancho de la img de la institucion que esta dentro del sidebar */
let tamanioLogo = computed(() => sidebarStore.tamanioLogo)

let apiBaseUrl= ref(import.meta.env.VITE_API_URL || 'http://192.168.0.14:3000')

const mostrarTitulo = computed(() => sidebarStore.tamanioSidebar !== '50px')

/* para el despliegue de dropdown  */
let mostrarDropDown = ref(false)

/* Datos de usuario desde auth.js de store */
import { useUsuarioStore } from '@/store/usuario.js'
let authStore = useUsuarioStore()
let usuario = computed(() => authStore.usuario)
console.log('usuario sidebar', usuario.value)
/* faltan detalles */
let nombre_usuario = computed(() => usuario.value?.nombre_usuario ?? 'x')
let nombre_rol = computed(() => usuario.value?.nombre_rol ?? 'x')
let nombre_establecimiento = computed(() => usuario.value?.nombre_establecimiento ?? 'x')

let perfil = computed(() => usuario.value?.perfil ?? 'usuario.png')

watch(
  tamanioSidebar,
  (newTamanioSidebar) => {
    console.log('Nuevo tamaño:', newTamanioSidebar)
  },
  { immediate: true },
)

/*  */
const desplegarDropDown = () => {
  mostrarDropDown.value = !mostrarDropDown.value
  console.log("dropdown", mostrarDropDown.value)
}

/* al pulsar el boton de cerrar sesion se ejecutara esta funcion */
const cerrarSesion = () => {
  authStore.cerrarSesion()
  router.push({ name: 'login' })
}

/* Funcion que maneja el tamaño del sidebar y algunos de sus componentes que cambian de tamaño, ademas del titulo del header*/
const mostrarSidebar = () => {
  sidebarStore.toggleSidebar()
}
</script>

<style scoped>
/* Header */
.header-sidebar {
  display: flex;
  flex-direction: row;
  /* border: 2px solid red; */
  align-items: center;
  background-color: var(--color-primary);
  padding: 10px;
  position: fixed;
  /* left: 0; */
  width: 100%;
  height: 15dvh;
  z-index: 100;
}

.title-sidebar {
  text-align: center;
  flex-grow: 1;
}
/* Aqui se encuentra la foto de perfil y el dropdown */
.user-sidebar {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.user-sidebar > .icon-sidebar {
  width: 20px;
  height: 20px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.img-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-header {
  position: relative;
}

.dropdown-header-content {
  width: 200px;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  margin: 0;
  right: 0;
  z-index: 1;
  row-gap: 10px;
  color: var(--color-black);
  border: 2px solid green;
  /* padding: 10px; */
}

.dropdown-header-content a {
  color: var(--color-black);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  padding: 10px;
  width: 100%;

}

.dropdown-header-content a:hover {
  background-color: var(--color-secondary);
  color: white;
}
/*  */
.sidebar {
  min-height: 85dvh;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: var(--color-primary);
  transition: width 0.3s ease, height 0.3s ease;
  position: fixed;
  top: 15dvh;
  padding-top: 10px;
  z-index: 100;
}

.section-logo-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
}

.logo-sidebar {
  border-radius: 50%;
}

.icon-sidebar {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}



.routes-sidebar {
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding: 10px;
  /* Para que  cuando se achique la frase, no se haga dos lineas o mas*/
  white-space: nowrap;
  overflow: hidden;
  color: white;
  border-bottom: 2px solid transparent;
}

.routes-sidebar:hover {
  background-color: rgb(224, 63, 62);
}

@media (max-width: 620px) {
  /* El titulo del header desaparecera */
  .title-sidebar {
    display: none;
  }
  /* Mi sidebar adoptara automaticamente ese ancho */
  .logo-sidebar {
    border-radius: 50%;
    padding: 0;
  }

  .header-sidebar{
    justify-content: space-between;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease; /* Cambia 0.3s a lo que necesites */
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
