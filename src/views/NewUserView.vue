<template>
  <div class="container-newuser">
    <form action="">
      <fieldset class="form-newuser">
        <legend class="legend-newuser">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newuser"/> -->
          <span class="titulo-newuser">DATOS DE USUARIO</span>
        </legend>

        <div class="form-content-newuser">
          <label for="">FOTO DE PERFIL</label>
            <img class="img-perfil" v-if="imagenUrl.value" :src="imagenUrl" alt="Imagen seleccionada"/>
            <img class="img-perfil" v-else src="../assets/usuario.png" alt="">
          <section class="content-newuser">
            <input class="input-file" ref="fileInput" type="file" @change="mostrarImagen" accept="image/*" style="display: none;"/>
            <button class="input-file" @click="fileInput.value.click()">Seleccionar imagen</button>
  <!-- <CIcon :icon="cilPlus" class="icon-sidebar" /> -->
            <label for="">NOMBRE DE USUARIO</label>
            <input type="text" v-model="municipio">
            <label for="">CORREO</label>
            <input type="text" v-model="zona">
            <label for="">CLAVE</label>
            <input type="text" v-model="av_calle">
            <label for="">ROL</label>
            <input type="text" v-model="nombre_establecimiento">
          </section>
        </div>
        <div class="form-content-newuser2">
          <button class="form-btn btn-cancel" v-on:click="retornarInicio"><CIcon :icon="cilX" class="icon-newuser"/>CANCELAR</button>
          <button class="form-btn btn-accept" v-on:click="registrarUsuario"><CIcon :icon="cilCheckAlt" class="icon-newuser"/>CONTINUAR</button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script setup>

import { CIcon } from '@coreui/icons-vue';
import { cilCheckAlt, cilX, cilPlus } from '@coreui/icons';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Establecimiento } from '@/models/Establecimiento.js';
/* router */
import { useRouter } from 'vue-router';
let router = useRouter();

let departamento=ref("");
let municipio=ref("");
let zona=ref("");
let av_calle=ref("");
let nombre_establecimiento=ref("");

let imagenUrl = ref(null)
let fileInput = ref(null)

const retornarInicio = () => {
  router.push({name: 'inicio'})
}

function mostrarImagen(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagenUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const registrarUsuario = async() =>{
  if(!departamento.value || !municipio.value || !zona.value || !av_calle.value || !nombre_establecimiento.value) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

/* Llamamos al modal persona para recoger los datos */
let establecimiento = new Establecimiento(
                      departamento.value, municipio.value, zona.value, av_calle.value, nombre_establecimiento.value);
             console.log("persona", establecimiento)
try {
  let resultSwal = await Swal.fire({
  title: "¿Estas seguro?",
  text: "Se registrara nuevos datos",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Agregar registro"
})

if (resultSwal.isConfirmed) {
  const resultado = await axios.post('http://localhost:3000/api/v1/stablishment/create', establecimiento);
  console.log("myRes",resultado)
  Swal.fire({
    title: "¡Registro Exitoso!",
    text: "Tus datos han sido registrados",
    icon: "success"
  });
  router.push({name: 'inicio'})
};
} catch (error) {
  console.log("errorPatient", error)
}

}

</script>

<style scoped>
/* contenedor principal que abarca toda la pantalla */
.container-newuser{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-newuser{
  display: flex;
  flex-direction: column;
  /* background-color: rgba(0, 128, 128, .4); */
  background-color: rgba(0, 128, 128, .5);
  border: none;
  padding: 20px;
  row-gap: 20px;
}


.form-content-newuser {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 2px solid black;
  width: 100%;
}

.content-newuser{
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 20px;
  /* background-color: rgba(0, 128, 128, .5); */
  width: 100%;
  border: 2px solid silver
}

.content-newuser > input{
  padding-left:5px;
}

input, select/* , .form-btn  */{
  border-radius: 20px;
  outline: none;
  border: none;
  /* width: 100%; */
  height: 20px;
}

.img-perfil{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.input-file{
  background-color: rgb(0, 128, 128);;
}

.legend-newuser{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.titulo-newuser {
  display: flex;
  /* background-color: rgb(224, 63, 62); */
  background-color: rgb(0, 128, 128);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
}

.icon-newuser{
  width: 20px;
  height: 20px;
  /* background-color: rgb(224, 63, 62) */;
}

.form-content-newuser2{
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
}

.form-btn{
  background-color: rgb(0, 128, 128);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  outline: none;
  border: none;
  min-width: 200px;
  height: 30px;
}

.form-btn:hover{
  background-color: rgb(224, 63, 62);
}



/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
.form-content-newuser2{
  flex-direction: column;
  row-gap: 20px;
}
}

</style>
