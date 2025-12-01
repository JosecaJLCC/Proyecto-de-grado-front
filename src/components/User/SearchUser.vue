<template>
  <div class="container-form-modal">
    <form @submit.prevent="searchUser" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVO USUARIO</span>
        </legend>

          <section class="register-form-modal">
            <label for="">DOCUMENTO DE IDENTIDAD</label>
            <input
              type="text"
              v-model="ci"
              placeholder="Ingrese solo el número"
              pattern="^[A-Za-z0-9 ]+$"
              title="Solo se permiten letras y números">
            <button class="form-btn" v-on:click="verifyUser">BUSCAR</button>
          </section>
      </fieldset>
      <div class="actions-form-modal">
          <button class="form-btn btn-cancel" @click="sendValueModal">
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
import { userService } from '@/services/Usuario.js';
import { ref } from 'vue'
import Swal from 'sweetalert2'

let ci=ref('');
let resultSearch=ref([]);

const emits = defineEmits(['modifyModalSearch']);
const sendValueModal = () => {
  emits('modifyModalSearch', false)
}

const searchUser = async () => {
  if (!ci.value) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: `Por favor complete todos los campos`,
    })
    return
  }
  try {
    resultSearch.value = await userService.searchUser(ci)
    console.log('myRes', resultado)
    if(!resultSearch.value.ok)
    Swal.fire({
      title: '¡Algo salió mal!',
      text: `${resultSearch.value.message}`,
      icon: 'Warning',
    })
    else{
      sendValueModal();
    }
  }
  catch (error) {
    console.log('errorPatient', error)
  }
}
</script>

<style scoped>
</style>
