<template>
  <div id="container-login">
    <form @submit.prevent="iniciarSesion">
      <fieldset id="formulario-login">
      <legend id="legend-login">
        <img class="logo-login" src="../assets/CapacabanaLogo.png" alt="" />
      </legend>
      <h2 id="title-login">INICIO DE SESION</h2>
      <!-- <br /> -->
      <label for="">CENTRO DE SALUD</label>
      <div class="entrada-icon-login">
        <select class="select-login" v-model="id_centro_salud">
          <option v-for="(item) of establecimiento" v-bind:key="item.id_establecimiento" :value="item.id_establecimiento" >{{ item.nombre }}</option>
        </select>
      </div>

      <label for=""> CORREO</label>
      <div class="entrada-icon-login">
        <input class="input-login" v-model="correo" type="email" />
        <CIcon :icon="cilUser" class="icon-login"/>
      </div>

      <label for="">CONTRASEÑA</label>
      <div class="entrada-icon-login">
        <input class="input-login" v-model="clave" :type="tipoClave" />
        <CIcon :icon="cilLockLocked" class="icon-login"/>
        <CIcon :icon="cilLowVision" class="icon-login-vision" v-on:click="verClave"/>
      </div>

      <button id="button-login" type="submit">INGRESAR</button>
      <a id="link-login" href="">¿Olvidó sus credenciales?</a>
    </fieldset>
    </form>
  </div>
</template>

<script setup>

import { CIcon } from '@coreui/icons-vue';
import { cilUser, cilLockLocked, cilLowVision, cilLockUnlocked } from '@coreui/icons';

import Swal from 'sweetalert2'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let correo = ref('')
let clave = ref('')
let tipoClave = ref('password');

let establecimiento = ref([])
let id_centro_salud = ref('')

/* Para la autenticacion y guardado de info del usuario */
import { useUsuarioStore } from '@/store/usuario.js';
let usuarioStore = useUsuarioStore();

onMounted(async()=>{
  try {
    let resultadoEst = await axios.get('http://localhost:3000/api/v1/stablishment/show')
    console.log("resultadoEst", resultadoEst.data.resultado)
    establecimiento.value = resultadoEst.data.resultado
  } catch (error) {
    console.log("error en cargar establecimientos: ", error)
  }
})

const iniciarSesion = async () => {
  /* Validar si los inputs no esten vacios */
    if(correo.value == '' || clave.value == '' || id_centro_salud.value == '') {
      Swal.fire({
        icon: "error",
        title: "Campos vacios",
        text: `Por favor complete todos los campos`,
      });
      return;
    }
    try {
      let resultSwal = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Se registrara nuevos datos",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#008080",
        cancelButtonColor: "#E03F3E",
        confirmButtonText: "Agregar registro"
    })
/* me quede aca en esta vista, el front sigue avanzando */
  if (resultSwal.isConfirmed) {
    let resultado = await axios.post('http://localhost:3000/api/v1/users/login', {
        correo: correo.value,
        clave: clave.value,
        id_establecimiento: id_centro_salud.value
      })
      console.log('my_data: ', resultado)
      if (resultado.data.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: ``,
        });
        localStorage.setItem('token', resultado.data.token)
        /*  */
        console.log("esta entrando?")
        await usuarioStore.cargarUsuario();
        console.log("esta entrando? si")
        router.push({
          name: 'inicio',
        })
      }
  };
  }  catch (error) {
      if(!error.response.correo && !error.response.clave){
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: `${error.response.msg}`,
        });
      }
      else if(!error.response.correo){
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: `${error.response.msg}`,
        });
      }
      else if(!error.response.clave){
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: `${error.response.msg}`,
        });
      }
    }
}

const verClave = () =>{
  /* alert("xxx",tipoClave.value) */
  tipoClave.value=="password" ? tipoClave.value='text' : tipoClave.value='password';
}
</script>

<style scoped>
#container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 100vh;
  /* border: 3px solid brown; */
}
#formulario-login {
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 350px;
  /* background-color: rgb(5, 15, 37, 0.8); */
  background-color: rgb(0, 128, 128);
  padding: 20px;
  row-gap: 20px;
  /* box-shadow: 0px 2px 20px 10px #00ffc8; */
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
  border: 3px solid rgb(0, 128, 128);
}

#legend-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#button-login {
  background-color: rgb(224, 63, 62);
  color: white;
  border: 0;
  outline: none;
  padding: 10px;
  border-radius: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#button-login:hover {
  background-color: #00ffc8;
  transition: 0.5s;
}

.input-login{
  font-size: medium;
  background: none;
  outline: none;
  border: none;
  border-bottom: 3px solid white;
  color: white;
  width: 100%;
  padding-left: 30px;
  height: 100%;
}

.select-login{
  text-align: center;
  font-size: medium;
  /* background-color:rgb(224, 63, 62); */
  background-color: rgb(0, 128, 128);
  outline: none;
  border: 3px solid white;
  border-radius: 20px;
  color: white;
  width: 100%;
  height: 100%;
}



#link-login {
  color: white;
}

.entrada-icon-login{
  height: 35px;
  position: relative;
}

/* .entrada-icon-login > select{
  background-color: rgb(224, 63, 62);
} */

.entrada-icon-login > input{
  color: white;
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
</style>
