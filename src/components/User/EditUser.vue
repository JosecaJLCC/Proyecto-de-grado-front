<template>
  <div class="container-form-modal">
    <form @submit.prevent="editUser" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">EDITAR USUARIO</span>
        </legend>
          <section class="register-form-modal">
            <div class="form-section-perfil">
              <label for="">FOTO DE PERFIL</label>
              <img
                class="img-perfil"
                v-if="imagenPerfil"
                :src="imagenPerfil"
                alt="Imagen seleccionada"
              />
              <img class="img-perfil" v-else src="@/assets/usuario.png" alt="" />
              <input
                class="input-file"
                ref="fileInput"
                type="file"
                @change="mostrarImagen"
                accept="image/*"
                style="display: none"
              />
              <button class="input-file" @click.prevent="abrirSelector">Seleccionar imagen</button>
            </div>
            <label for="">CLAVE</label>
            <input type="password" v-model="clave" />
          </section>
      </fieldset>
      <div class="actions-form-modal">
          <button class="form-btn btn-cancel" type="button" @click="sendValueModal">
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

let nombre_usuario = ref('')
let clave = ref('')
let result=ref({})
let imagenPerfil = ref(null)
let fileInput = ref(null)
let archivoImagen = ref(null)

const emits = defineEmits(['modifyModalEdit']);
let props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const sendValueModal = () => {
  emits('modifyModalEdit', false)
}

function mostrarImagen(event) {
  const file = event.target.files[0]
  if (file) {
    archivoImagen.value = file // Guarda el archivo original
    const reader = new FileReader()
    reader.onload = (e) => {
      imagenPerfil.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const abrirSelector = () => {
  fileInput.value?.click()
}

const editUser = async () => {
  if (!clave.value && !imagenPerfil.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacios',
      text: "Debe haber al menos un cambio",
    })
    return;
  }
  const formData = new FormData()
  formData.append('clave', clave.value)
  formData.append('imagenPerfil', archivoImagen.value)
  try {
    let resultSwal = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Se editará la información del usuario",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Aceptar cambios"
    })
    if (resultSwal.isConfirmed) {
      result.value = await  userService.updateUser(props.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
       if(result.value.ok){
        Swal.fire({
          title: "¡Cambio exitoso!",
          text: "Tus datos fueron corregidos",
          icon: "success"
        });
        sendValueModal();
      }else{
        Swal.fire({
          title: "¡Cambio fallido!",
          text: result.value.message,
          icon: "error"
        });
      }
    }
  } catch (error) {
    console.log('errorPatient', error)
  }
}
</script>

<style scoped>

.register-div-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  color: var(--color-black);
}

.img-perfil {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.input-file {
  background-color: rgb(0, 128, 128);
  color: white;
  border-radius: 20px;
  border: none;
  width: 100%;
}

.input-file:hover {
  background-color: rgb(224, 63, 62);
}

.form-section-perfil{
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
}
</style>
