<template>
  <div class="container-form-modal">
    <form action="" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">MICRORED</span>
        </legend>
          <section class="register-form-modal">
            <p>CODIGO DE LA MICRORED: <strong>{{ props.microred.codigo }}</strong></p>
            <p>NOMBRE DE LA MICRORED: <strong>{{ props.microred.nombre_microred }}</strong></p>
            <p>RED PERTENECIENTE: <strong>{{ props.microred.red }}</strong></p>
            <p>FECHA DE CREACION: <strong>{{ fecha_creacion }}</strong></p>
            <p>HORA DE CREACION: <strong>{{ hora }}</strong></p>
            <p>DIRECTOR:  <strong>{{ props.microred.nombres }}</strong></p>
            <p>CI DEL DIRECTOR:  <strong>{{ props.microred.ci }}</strong></p>
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
  microred:{
    type: Object,
    required: true
  }
})
let fecha_creacion = props.microred.fecha_creacion.split(" ")[0];
let hora = props.microred.fecha_creacion.split(" ")[1];
</script>

<style scoped>
</style>

