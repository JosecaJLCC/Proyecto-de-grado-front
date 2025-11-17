<template>
  <div class="container-form-modal">
    <form @submit.prevent="createUser" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVO USUARIO</span>
        </legend>
        <div class="register-div-modal">

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
            <label for="">ROL</label>
            <select name="" id="" v-model="id_rol">
              <option value="1">DIRECTOR</option>
              <option value="2">PERSONAL MEDICO</option>
              <option value="3">PERSONAL OPERATIVO</option>
            </select>
            <label for="">USUARIO</label>
            <input type="text" v-model="nombre_usuario" />
            <label for="">CLAVE</label>
            <input type="password" v-model="clave" />
          </section>
        </div>
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


let nombre_usuario = ref('')
let clave = ref('')
let id_rol = ref('')
let id_personal = ref('');

let ci=ref('');
let resultSearch=ref([]);

let imagenPerfil = ref(null)
let fileInput = ref(null)
let archivoImagen = ref(null)

const emits = defineEmits(['modifyModalAdd']);
const sendValueModal = () => {
  emits('modifyModalAdd', false)
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

const createUser = async () => {
  if (!nombre_usuario.value || !clave.value || !id_rol.value) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: `Por favor complete todos los campos`,
    })
    return
  }
  const formData = new FormData()
  formData.append('nombre_usuario', nombre_usuario.value)
  formData.append('clave', clave.value)
  formData.append('imagenPerfil', archivoImagen.value)
  formData.append('id_personal', id_personal.value)
  formData.append('id_rol', id_rol.value)
  try {
    let resultSwal = await Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se registrara nuevos datos',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar registro',
    })

    if (resultSwal.isConfirmed) {
      const resultado = await  userService.createUser(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('myRes', resultado)
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Tus datos han sido registrados',
        icon: 'success',
      })
      router.push({ name: 'inicio' })
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
