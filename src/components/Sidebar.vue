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
        <CIcon :icon="cilChatBubble" class="icon-sidebar" />
        <CIcon :icon="cilBell" class="icon-sidebar" />
        <!-- <img src="../assets/logo.svg" class="perfil-sidebar"> -->
        <div class="perfil-section">
          <CIcon :icon="cilUserFemale" class="perfil-sidebar" />
          <p>{{ nombre_usuario }}</p>
          <p>{{ rol }}</p>
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
      </section>

      <nav class="nav-sidebar">
        <ul>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'inicio' }">
              <CIcon :icon="cilHome" class="icon-sidebar" />
              <span>Inicio</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'nuevo-paciente' }">
              <CIcon :icon="cilUserPlus" class="icon-sidebar" />
              <span>Nuevo Paciente</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'nuevo-registro' }">
              <CIcon :icon="cilNoteAdd" class="icon-sidebar" />
              <span>Registrar Atención</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-general' }">
              <CIcon :icon="cilHistory" class="icon-sidebar" />
              <span>Historial General</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'registrar-usuario' }">
              <CIcon :icon="cilChevronBottom" class="icon-sidebar" />
              <span>Nuevo Usuario</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'registrar-centro-salud' }">
              <CIcon :icon="cilHospital" class="icon-sidebar" />
              <span>Nuevo Centro de Salud</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-usuarios' }">
              <CIcon :icon="cilPeople" class="icon-sidebar" />
              <span>Usuarios Registrados</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="rutas-sidebar" :to="{ name: 'historial-centro-salud' }">
              <CIcon :icon="cilChevronBottom" class="icon-sidebar" />
              <span>Establecimientos de Salud</span>
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
  cilUserFemale,
  cilPeople,
} from '@coreui/icons'
import { ref, watch, computed, onMounted } from 'vue'
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

/* para el despliegue de dropdown  */
let mostrarDropDown=ref(false);

/* Datos de usuario desde auth.js de store */
import { useUsuarioStore } from '@/store/usuario.js'
let authStore = useUsuarioStore();
let usuario = computed(() => authStore.usuario)
console.log('usuario sidebar', usuario)
/* faltan detalles */
let nombre_usuario = computed(()=>usuario.value?.nombre_usuario ?? 'x');

let rol=computed(()=>usuario.value?.rol ?? 'x');

watch(tamanioSidebar,(newTamanioSidebar) => {
    console.log('Nuevo tamaño:', newTamanioSidebar)
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
  justify-content: center;
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
</style>
