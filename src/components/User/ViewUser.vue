<template>
  <div class="container-form-modal">
    <form action="" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">USUARIO</span>
        </legend>
          <section class="register-form-modal">
            <div class="img-profile-form-modal">
              <img class="img-profile" :src="`${apiBaseUrl}:3000/uploads/${props.user.perfil}`" alt="">
            </div>
            <p>USUARIO: <strong>{{ props.user.nombre_usuario }}</strong></p>
            <p>CI: <strong>{{ props.user.ci }}</strong></p>
            <p>NOMBRES: <strong>{{ props.user.nombres }}</strong></p>
            <p>FECHA DE CREACION: <strong>{{ fecha_creacion }}</strong></p>
            <p>HORA DE CREACION: <strong>{{ hora }}</strong></p>
          </section>
        <div class="actions-form-modal">
          <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>VOLVER</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import '@/assets/styles/modalForm.css';
const emits = defineEmits(['modifyModalView'])
const sendValueModal = () => {
  emits('modifyModalView', false)
}

let apiBaseUrl= ref(import.meta.env.VITE_API_URL || 'http://192.168.0.14:3000')

let props=defineProps({
  user:{
    type: Object,
    required: true
  }
})
let fecha_creacion = props.user.fecha_creacion.split(" ")[0];
let hora = props.user.fecha_creacion.split(" ")[1];
</script>

<style scoped>
.img-profile {

  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.img-profile-form-modal{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

