<template>
  <div>
    <header class="header-sidebar">
      <section class="main-sidebar">
        <!-- <transition name="fade"> -->
        <CIcon
          v-if="cambioIcon"
          :icon="cilArrowLeft"
          class="icon-sidebar"
          v-on:click="mostrarSidebar"
        />
        <CIcon v-else :icon="cilMenu" class="icon-sidebar" v-on:click="mostrarSidebar" />
        <!-- </transition> -->
      </section>
      <h3 class="titulo-sidebar">
        SISTEMA DE CONTROL DE PREVENCION DEL USO INDEBIDO DEL SISTEMA UNICO DE SALUD
      </h3>
      <section class="user-sidebar">
        <!-- <img src="../assets/logo.svg" class="perfil-sidebar"> -->
        <div class="perfil-section">
          <img class="img-perfil" :src="`http://localhost:3000/uploads/${perfil}`" alt="">
          <p>{{ nombre_usuario }}</p>
          <!-- <p><strong>{{ rol }}</strong></p> -->
        </div>
        <div class="dropdown-sidebar">
          <CIcon
            :icon="cilChevronBottom"
            class="icon-sidebar desplegar-dropdown"
            @click="desplegarDropDown"
          />
          <div v-show="mostrarDropDown" class="dropdown-content">
            <a href="">
              <CIcon :icon="cilSettings" class="icon-sidebar" />
              <span>Configuracion</span>
            </a>
            <a href="" v-on:click="cerrarSesion">
              <CIcon :icon="cilPowerStandby" class="icon-sidebar" />
              <span>Cerrar Sesion</span>
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
        <h3 v-if="mostrarTitulo">"{{ establecimiento }}"</h3>
      </section>

      <nav class="nav-sidebar">
        <ul>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'inicio' }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-home icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"  />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              <!-- <CIcon :icon="cilHome" class="icon-sidebar" /> -->
              <span>Inicio</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'nuevo-registro' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-plus icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M12 11l0 6" />
                <path d="M9 14l6 0" />
              </svg>
              <span>Registrar Atención</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-general' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-history icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 8l0 4l2 2" />
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
              </svg>
              <span>Historial General</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'registrar-personal' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <span>Usuarios</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-centro-salud' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-medical-cross icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z" />
              </svg>
              <span>Establecimientos de Salud</span>
            </RouterLink>
          </li>
           <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-centro-salud' }">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-report icon-sidebar">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" /><path d="M18 14v4h4" />
                <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
                <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M8 11h4" />
                <path d="M8 15h3" />
              </svg>
              <span>Reportes</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>

import { CIcon } from '@coreui/icons-vue'
import {
  cilHospital,
  cilHistory,
  cilHome,
  cilUserPlus,
  cilClipboard,
  cilNoteAdd,
  cilSettings,
  cilMenu,
  cilArrowLeft,
  cilChevronBottom,
  cilChatBubble,
  cilPowerStandby,
  cilBell,
  cilPeople,
} from '@coreui/icons'
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

const mostrarTitulo = computed(() => sidebarStore.tamanioSidebar !== '50px');

/* para el despliegue de dropdown  */
let mostrarDropDown=ref(false);

/* Datos de usuario desde auth.js de store */
import { useUsuarioStore } from '@/store/usuario.js'
let authStore = useUsuarioStore();
let usuario = computed(() => authStore.usuario)
console.log('usuario sidebar', usuario.value)
/* faltan detalles */
let nombre_usuario = computed(()=>usuario.value?.correo ?? 'x');

let rol=computed(()=>usuario.value?.nombre_rol ?? 'x');

let establecimiento=computed(()=>usuario.value?.nombre_establecimiento ?? 'x');

let perfil = computed(()=> usuario.value?.perfil ?? 'usuario.png');

watch(tamanioSidebar,(newTamanioSidebar) => {
    console.log('Nuevo tamaño:', newTamanioSidebar)
    console.log("mi perfil", perfil)
  },
  { immediate: true },
)

/*  */
const desplegarDropDown = () => {
  mostrarDropDown.value = !mostrarDropDown.value
}

/* al pulsar el boton de cerrar sesion se ejecutara esta funcion */
const cerrarSesion = () => {
  authStore.cerrarSesion();
  router.push({ name: 'login' });
}

/* Funcion que maneja el tamaño del sidebar y algunos de sus componentes que cambian de tamaño, ademas del titulo del header*/
const mostrarSidebar = () => {
  sidebarStore.toggleSidebar()
}
</script>

<style scoped>
.header-sidebar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(0, 128, 128);
  /* border: 3px solid green; */
  padding: 10px;
  position: fixed;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
}

.main-sidebar {
  display: flex;
  align-items: center;
  column-gap: 10px;
  /* border: 2px solid red; */
  flex-grow: 1;
}

.user-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* border: 2px solid yellow; */
  column-gap: 20px;
  flex-grow: 1;
}

.user-sidebar > .icon-sidebar {
  width: 20px;
  height: 20px;
}

.sidebar {
  min-height: 100vh;
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: rgb(0, 128, 128);

  transition: width 0.3s ease, height 0.3s ease;
  position: fixed;
  top: 82px;
  padding-top: 10px;
  border-radius: 0px 20px 20px 0px;
  z-index: 100;
}

.section-logo-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
}

.icon-sidebar {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.logo-sidebar {
  border-radius: 50%;
}

.perfil-sidebar {
  width: 40px;
  height: 40px;
}

.titulo-sidebar {
  text-align: center;
  /* border: 2px solid gold; */
  flex-grow: 1;
}

.rutas-sidebar {
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

.rutas-sidebar:hover {
  /* border-bottom: 2px solid #ffffff; */
  background-color: rgb(224, 63, 62);
}

.rutas-sidebar:focus {
  background-color: rgb(224, 63, 62);
}

@media (max-width: 620px) {
  /* El titulo del header desaparecera */
  .titulo-sidebar {
    display: none;
  }
/* Mi sidebar adoptara automaticamente ese ancho */
  .logo-sidebar {
    border-radius: 50%;
    padding: 0;
  }

  /* .section-logo-sidebar > h3{
    display: none
  } */
}
/* dropdown */
.desplegar-dropdown {
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin: 0;
  /* border: 2px solid greenyellow; */
}

.dropdown-content a {
  color: rgb(0, 128, 128);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  padding: 10px;
  /* border: 2px solid black; */
}

.dropdown-content a:hover {
  background-color: rgb(224, 63, 62);
  color: white;
}

.dropdown-sidebar {
  position: relative;
  display: inline-block;
  /* border: 2px solid black; */
}

.dropdown-sidebar:hover .dropdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
  right: 0px;
  row-gap: 10px;
}

.perfil-section{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.img-perfil{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
