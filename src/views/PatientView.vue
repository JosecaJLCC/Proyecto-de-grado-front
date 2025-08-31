<template>
  <div class="container-newhospital">
    <fieldset class="form-newhospital">
      <legend class="legend-newhospital">
        <!-- <CIcon :icon="cilUserPlus" class="icon-newhospital"/> -->
         <span class="titulo-newhospital">DATOS DEL PACIENTE</span>
      </legend>

      <div class="form-content-newhospital">
        <section class="content-newhospital">

          <span>Cedula de Identidad: <strong>{{ persona.ci }}{{ persona.extension }}</strong></span>

          <span>Nombres: <strong>{{ persona.nombre }}</strong></span>

          <span>Apellidos: <strong>{{ persona.paterno }} {{ persona.materno }}</strong></span>

          <span>Fecha de nacimiento: <strong>{{ persona.fecha_nacimiento }}</strong></span>

          <span>Sexo: <strong>{{ persona.sexo }}</strong></span>

          <span>Nacionalidad <strong>{{ persona.nacionalidad }}</strong></span>

          <span>Contacto: <strong>{{ persona.nro_telf }}</strong></span>


        </section>
        <section class="content-newhospital">


          <span>Departamento: <strong>{{ persona.departamento }}</strong></span>

          <span>Municipio: <strong>{{ persona.municipio }}</strong></span>

          <span>Zona: <strong>{{ persona.zona }}</strong></span>

          <span>Avenida o calle: <strong>{{ persona.av_calle }}</strong></span>

          <span>Nro de puerta: <strong>{{ persona.nro_puerta }}</strong></span>
        </section>
      </div>

      <div class="form-content-newhospital2">
        <button class="form-btn btn-accept" v-on:click="registrarHospital"><CIcon :icon="cilCheckAlt" class="icon-newhospital"/>EDITAR</button>
      </div>
    </fieldset>
  </div>
</template>

<script setup>

import { CIcon } from '@coreui/icons-vue';
import { cilCheckAlt} from '@coreui/icons';

import { onMounted, ref } from 'vue';
import axios from 'axios';
/* router */
import { useRoute } from 'vue-router';

/* Te da acceso a la información de la ruta actual. */
let route = useRoute();
let id_person = ref(route.params.id)
console.log("my id persona",id_person.value)
let persona = ref({})

onMounted(async()=>{
  try {
    const resultado = await axios.get(`http://localhost:3000/api/v1/people/show/${id_person.value}`)

    persona.value = resultado.data.resultado;

    persona.value.fecha_nacimiento=persona.value.fecha_nacimiento.split("T")[0]
  } catch (error) {
    console.log(error)
  }
})

</script>

<style scoped>
/* contenedor principal que abarca toda la pantalla */
.container-newhospital{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-newhospital{
  display: flex;
  flex-direction: column;
  /* background-color: rgba(0, 128, 128, .4); */
  background-color: rgba(0, 128, 128, .7);
  border: none;
  padding: 20px;
  row-gap: 20px;
}

/* NOTA: no funciona con grid maldita sea cambiare a flex */
.form-content-newhospital {
  display: flex;
  flex-direction: column;
  /* grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); */
  gap: 20px;
  /* border: 2px solid black; */
  flex-wrap: wrap;
  width: 100%;
}

.content-newhospital{
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  /* background-color: rgba(0, 128, 128, .5); */
  width: 100%;
  /* flex-grow: 1; */
  /* border: 2px solid green */
}

.content-newhospital > input{
  padding-left:5px;
}

input, select/* , .form-btn  */{
  border-radius: 20px;
  outline: none;
  border: none;
  /* width: 100%; */
  height: 20px;
}

.legend-newhospital{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.titulo-newhospital {
  display: flex;
  /* background-color: rgb(224, 63, 62); */
  background-color: rgb(0, 128, 128);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
}

.icon-newhospital{
  width: 20px;
  height: 20px;
  /* background-color: rgb(224, 63, 62) */;
}

.form-content-newhospital2{
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
.form-content-newhospital2{
  flex-direction: column;
  row-gap: 20px;
}
}

</style>
