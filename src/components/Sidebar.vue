<template>
  <div>
    <header class="header-sidebar">
        <section class="main-sidebar">
          <!-- <transition name="fade"> -->
            <CIcon v-if="cambioIcon" :icon="cilArrowLeft" class="icon-sidebar" v-on:click="mostrarSidebar"/>
            <CIcon v-else :icon="cilMenu" class="icon-sidebar" v-on:click="mostrarSidebar"/>
          <!-- </transition> -->
        </section>
        <h3 class="titulo-sidebar">
              SISTEMA DE CONTROL DE PREVENCION DEL USO INDEBIDO DEL SISTEMA UNICO DE SALUD
        </h3>
        <section class="user-sidebar">
            <CIcon :icon="cilChatBubble" class="icon-sidebar"/>
            <CIcon :icon="cilBell" class="icon-sidebar"/>
            <!-- <img src="../assets/logo.svg" class="perfil-sidebar"> -->
            <CIcon :icon="cilUserFemale" class="perfil-sidebar"/>
            <div class="dropdown-sidebar">
              <CIcon :icon="cilChevronBottom" class="icon-sidebar desplegar-dropdown" @click="desplegarDropDown"/>
              <div class="dropdown-content">
                <a href="">
                  <CIcon :icon="cilSettings" class="icon-sidebar"/>
                  <span>Configuracion</span>
                </a>
                <a href="">
                  <CIcon :icon="cilPowerStandby" class="icon-sidebar"/>
                  <span>Cerrar Sesion</span>
                </a>
              </div>
            </div>

        </section>
    </header>

    <div :class='claseTamanioSidebar'>
        <section class="section-logo-sidebar">
            <img src="../assets/CapacabanaLogo.png" alt="" :class="claseLogo">
        </section>

        <nav class="nav-sidebar">
            <ul>
                <li>
                        <RouterLink class="rutas-sidebar" :to="{ name: 'inicio' }">
                          <CIcon :icon="cilHome" class="icon-sidebar"/>
                          <span>Inicio</span>
                          </RouterLink>
                </li>
                <li>
                        <RouterLink class="rutas-sidebar" :to="{ name: 'nuevo-paciente' }">
                          <CIcon :icon="cilUserPlus" class="icon-sidebar"/>
                          <span>Nuevo Paciente</span>
                        </RouterLink>
                </li>
                <li>
                        <RouterLink class="rutas-sidebar" :to="{ name: 'nuevo-registro' }">
                          <CIcon :icon="cilNoteAdd" class="icon-sidebar"/>
                          <span>Registrar Atención</span>
                        </RouterLink>
                </li>
                <li>
                        <RouterLink class="rutas-sidebar" :to="{ name: 'historial-general' }">
                          <CIcon :icon="cilClipboard" class="icon-sidebar"/>
                          <span>Historial General</span>
                        </RouterLink>
                </li>
                <li>
                        <RouterLink class="rutas-sidebar" :to="{ name: 'registrar-usuario' }">
                          <CIcon :icon="cilSettings" class="icon-sidebar"/>
                          <span>Administrador</span>
                        </RouterLink>
                </li>
            </ul>
        </nav>
    </div>

  </div>
</template>

<script setup>
  import { CIcon } from '@coreui/icons-vue';
  import { cilHome, cilUserPlus, cilClipboard, cilNoteAdd,
    cilSettings, cilMenu, cilArrowLeft, cilChevronBottom,
    cilChatBubble, cilPowerStandby, cilBell, cilUserFemale } from '@coreui/icons';
  import { ref, watch } from 'vue';
  let tamanioSidebar = ref('300px');
  let cambioIcon = ref(true);
  let claseLogo=ref('logo-sidebar');
  let claseTamanioSidebar=ref('sidebar');

  watch(tamanioSidebar, (newTamanioSidebar) => {
    console.log("Nuevo tamaño:", newTamanioSidebar);
  }, { immediate: true });

const mostrarSidebar = () => {
  tamanioSidebar.value = tamanioSidebar.value === "300px" ? "50px" : "300px";
  cambioIcon.value ? cambioIcon.value=false : cambioIcon.value=true;
  claseLogo.value=='logo-sidebar'? claseLogo.value = 'logo-sidebar2' :  claseLogo.value = 'logo-sidebar';
  claseTamanioSidebar.value=='sidebar' ? claseTamanioSidebar.value='sidebar2' : claseTamanioSidebar.value='sidebar';
};

</script>

<style scoped>
    .header-sidebar{
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

    }

    .main-sidebar{
        display: flex;
        align-items: center;
        column-gap: 10px;
        /* border: 2px solid red; */
        flex-grow: 1;
    }

    .user-sidebar{
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* border: 2px solid yellow; */
        column-gap: 20px;
        flex-grow: 1;
    }

    .user-sidebar > .icon-sidebar{
        width: 20px;
        height: 20px;

    }

    /* Los cambios aca se los debe hacer al sidebar2 */
    .sidebar{
        /* background-color: rgb(224, 63, 62); */
        height: 100vh;
        width: 300px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        row-gap: 10px;
        background-color: rgb(0, 128, 128);
        transition: width 0.3s ease;
        position: fixed;
        top: 82px;
        /* border: 3px solid orange; */
        padding-top:10px;
        border-radius: 0px 20px 20px 0px;
        z-index: 100;
    }
    .sidebar2{
        /* background-color: rgb(224, 63, 62); */
        height: 100vh;
        width: 50px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        row-gap: 10px;
        background-color: rgb(0, 128, 128);
        transition: width 0.3s ease;
        position: fixed;
        top: 82px;
        /* border: 3px solid orange; */
        padding-top:10px;
        border-radius: 0px 20px 20px 0px;
    }

    .section-logo-sidebar{
        display: flex;
        justify-content: center;

    }

 .icon-sidebar{
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    transition: all 0.3s ease;
 }

 .logo-sidebar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 5px;
 }

 .logo-sidebar2{
    width: 30px;
    height: 30px;
    border-radius: 50%;
 }

 .perfil-sidebar{
    width: 40px;
    height: 40px;
 }

 .titulo-sidebar{
  text-align: center;
  /* border: 2px solid gold; */
  flex-grow: 1;
 }

.rutas-sidebar{
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


 .rutas-sidebar:hover{
   /* border-bottom: 2px solid #ffffff; */
   background-color: rgb(224, 63, 62);
 }

 .rutas-sidebar:focus{
  background-color: rgb(224, 63, 62);
 }

 @media (max-width: 620px) {
  .titulo-sidebar{
    display: none;
  }

  .sidebar{
    width: 50px;
  }

  .logo-sidebar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 0;
 }
}
/* dropdown */
.desplegar-dropdown{
  cursor: pointer;
}

.dropdown-content{
  display: none;
  position: absolute;
  background-color: white;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin:0;
  /* border: 2px solid greenyellow; */
}

.dropdown-content a{
 color: rgb(0, 128, 128);
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 column-gap: 10px;
 padding: 10px;
 /* border: 2px solid black; */
}

.dropdown-content a:hover{
  background-color: rgb(224, 63, 62);
  color: white;
}

.dropdown-sidebar{
  position: relative;
  display: inline-block;
  /* border: 2px solid black; */
}

.dropdown-sidebar:hover .dropdown-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
  right: 0px;
  row-gap: 10px;

}
</style>
