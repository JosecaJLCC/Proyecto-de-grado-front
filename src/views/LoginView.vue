<template>
  <div id="container-login">
    <form @submit.prevent="iniciarSesion">
      <fieldset id="formulario-login">
        <legend id="legend-login">
          <img class="logo-login" src="../assets/CapacabanaLogo.png" alt="" />
        </legend>
        <h2 id="title-login">INICIO DE SESIÓN</h2>

        <label for=""> NOMBRE DE USUARIO</label>
        <div class="entrada-icon-login">
          <input class="input-login" v-model="nombre_usuario" type="text" />
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-user icon-login"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
        </div>

        <label for="">CONTRASEÑA</label>
        <div class="entrada-icon-login">
          <input class="input-login" v-model="clave" :type="tipoClave" />
           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-lock icon-login"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" /></svg>
          <transition name="fade" mode="out-in">
            <svg v-if="cambioIcon" v-on:click="verClave"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off icon-login-vision"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
            <svg v-else v-on:click="verClave" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye icon-login-vision"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
          </transition>
        </div>

        <button id="button-login" type="submit">INGRESAR</button>
        <a id="link-login" href="">¿Olvidó sus credenciales?</a>
      </fieldset>
    </form>
    <ChooseCentroSalud class="content-form-cs" v-if="modalVisibleChoose" :data="result" @modificarModalChoose="ocultarModalChoose"/>
  </div>
</template>

<script setup>
import ChooseCentroSalud from '@/components/ChooseCentroSalud.vue'
import { userService } from '@/services/Usuario.js'
import Swal from 'sweetalert2'
import { ref } from 'vue'

let nombre_usuario = ref('')
let clave = ref('')
let tipoClave = ref('password');

let cambioIcon = ref(true);
let modalVisibleChoose=ref(false);
let result=ref({});
const iniciarSesion = async () => {
  /* Validar si los inputs no esten vacios */
    if(nombre_usuario.value == '' || clave.value == '') {
      Swal.fire({
        icon: "error",
        title: "Campos vacios",
        text: `Por favor complete todos los campos`,
      });
      return;
    }
    try {
        result.value = await userService.login({nombre_usuario: nombre_usuario.value, clave: clave.value })
          if (result.value.ok) {
            console.log("ok: ", result.value.data)
            result.value=result.value.data;
            modalVisibleChoose.value = !modalVisibleChoose.value;
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Credenciales incorrectas",
              text: `${result.value.message}`
            });
          }
  }
  catch (error) {
      if (!error.response) {
        Swal.fire({
          icon: "error",
          title: "Servidor no disponible",
          text: "No se pudo conectar al servidor. Intente más tarde.",
        });
        return;
      }
    }
}

const verClave = () =>{
  tipoClave.value=="password" ? tipoClave.value='text' : tipoClave.value='password';
  cambioIcon.value=!cambioIcon.value;
}

const ocultarModalChoose = (valor) => {
  modalVisibleChoose.value = valor;
}
</script>

<style scoped>
.content-form-cs{
    position: absolute; /* o fixed, si prefieres */
    top: 0px;
    left: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-black-transparent); /* blanco semitransparente */
    backdrop-filter: blur(5px); /* 🔥 Aquí se hace el desenfoque */
    -webkit-backdrop-filter: blur(5px); /* compatibilidad con Safari */
    z-index: 10;
  }

#container-login {
  background-image: url('@/assets/background7.jfif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 100dvh;
}
#formulario-login {
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 350px;
  background-color: var(--color-white);
  padding: 20px;
  row-gap: 20px;
}

#formulario-login > * {
  width: 100%; /* Hace que todos los elementos ocupen el 100% del formulario */
  flex-grow: 1; /* Permite que los elementos se expandan uniformemente */
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-login {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 3px solid var(--color-primary);
}

#legend-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#button-login {

  background-color: var(--color-primary);
  color: var(--color-white);
  border: 0;
  outline: none;
  padding: 10px;
  border-radius: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#button-login:hover {
  background-color: var(--color-secondary);
  transition: 0.5s;
}

.input-login{
  font-size: medium;
  background-color: none;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  width: 100%;
  padding-left: 30px;
  height: 100%;
}

#link-login {
  color: var(--color-primary);
}

.entrada-icon-login{
  height: 35px;
  position: relative;
}

.entrada-icon-login > input{
  color: var(--color-black);
}

.icon-login{
  position: absolute;
  height: 20px;
  width: 20px;
  left: 0px;
  margin: 5px;
}

.icon-login-vision{
  position: absolute;
  height: 20px;
  width: 20px;
  margin: 5px;
  right: 0px;
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
