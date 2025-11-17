<template>
  <div class="container-form-modal">
    <form action="" v-on:submit.prevent="createMicrored" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVA MICRORED</span>
        </legend>
        <section class="register-form-modal">
          <label for="">CODIGO DE LA MICRORED</label>
          <input type="text" v-model="codigo">
          <label for="">NOMBRE DE LA MICRORED</label>
          <input type="text" v-model="nombre_microred">
          <label for="">RED PERTENECIENTE</label>
          <input type="text" v-model="red">
          <label for="">CI DEL DIRECTOR</label>
          <input type="text" v-model="ci_director">
        </section>
      </fieldset>
      <div class="actions-form-modal">
        <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
          CANCELAR</button>
        <button class="form-btn btn-accept" type="submit">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>
          ACEPTAR</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import '@/assets/styles/modalForm.css';
import { microredService } from '@/services/Microred.js';
import { ref} from 'vue';
import Swal from 'sweetalert2';
import { Microred } from '@/models/Microred.js';
let codigo=ref("");
let nombre_microred=ref("");
let red=ref("");
let ci_director=ref("");
let result = ref({})
const emits = defineEmits(['modifyModalAdd'])

const sendValueModal = () => {
  emits('modifyModalAdd', false)
}

const createMicrored = async() =>{
  if(!codigo.value || !nombre_microred.value || !red.value || !ci_director.value) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

  let microred = new Microred(
                              nombre_microred.value.toUpperCase(),
                              red.value.toUpperCase(),
                              ci_director.value,
                              codigo.value);

  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se registrará la nueva microred",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Agregar registro"
    })

    if (resultSwal.isConfirmed) {
      result.value = await microredService.createMicrored(microred);
      if(result.value.ok){
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: result.value.message,
          icon: "success"
        });
        sendValueModal();
      }else{
        Swal.fire({
          title: "¡Registro no realizado!",
          text: result.value.message,
          icon: "error"
        });
      }

    };
  } catch (error) {
      console.log("Error en el agregar microred", error)
    }
  }
</script>

<style scoped>
</style>
