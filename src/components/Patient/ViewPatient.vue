<template>
  <div class="container-form-modal">
    <form action="" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">ESTABLECIMIENTO</span>
        </legend>
          <section class="register-form-modal">
            <p>CI: <strong>{{ props.patient.ci }}</strong></p>
            <p>NOMBRES: <strong>{{ props.patient.nombres }}</strong></p>
            <p>NACIONALIDAD: <strong>{{ props.patient.nacionalidad }}</strong></p>
            <p>FECHA DE NACIMIENTO: <strong>{{ fecha_nacimiento }}</strong></p>
            <p>ESTADO CIVIL: <strong>{{ props.patient.estado_civil }}</strong></p>
            <p>NRO DE TELF: <strong>{{ props.patient.nro_telf }}</strong></p>
            <p>SEXO: <strong>{{ props.patient.sexo }}</strong></p>
            <p>FECHA DE CREACION: <strong>{{ fecha_creacion }}</strong></p>
            <p>HORA DE CREACION: <strong>{{ hora }}</strong></p>
            <p>MICRORED: <strong>{{ props.patient.nombre_microred }}</strong></p>
            <!-- <p>DEPARTAMENTO:  <strong>{{ props.patient.departamento }}</strong></p>
            <p>MUNICIPIO:  <strong>{{ props.patient.municipio }}</strong></p>
            <p>ZONA:  <strong>{{ props.patient.zona }}</strong></p>
            <p>AVENIDA/CALLE:  <strong>{{ props.patient.av_calle }}</strong></p> -->
          </section>
      </fieldset>
      <div class="actions-form-modal">
        <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>VOLVER</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import '@/assets/styles/modalForm.css';
const emits = defineEmits(['modifyModalView'])
const sendValueModal = () => {
  emits('modifyModalView', false)
}

let props=defineProps({
  patient:{
    type: Object,
    required: true
  }
})
let fecha_nacimiento=props.patient.fecha_nacimiento.split("T")[0]
let fecha_creacion = props.patient.fecha_creacion.split(" ")[0];
let hora = props.patient.fecha_creacion.split(" ")[1];
</script>

<style scoped>
</style>

