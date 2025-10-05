<template>
  <div class="container-newuser">
    <form @submit.prevent="createUser" class="form-content">
      <fieldset class="form-newuser">
        <legend class="legend-newuser">
          <span class="titulo-newuser">DATOS DE USUARIO</span>
        </legend>
        <div class="form-content-newuser">
          <label for="">FOTO DE PERFIL</label>
          <img
            class="img-perfil"
            v-if="imagenPerfil"
            :src="imagenPerfil"
            alt="Imagen seleccionada"
          />
          <img class="img-perfil" v-else src="@/assets/usuario.png" alt="" />
          <section class="content-newuser">
            <input
              class="input-file"
              ref="fileInput"
              type="file"
              @change="mostrarImagen"
              accept="image/*"
              style="display: none"
            />
            <button class="input-file" @click.prevent="abrirSelector">Seleccionar imagen</button>
            <label for="">ROL</label>
            <select name="" id="" v-model="id_rol">
              <option value="2">PERSONAL</option>
              <option value="3">DIRECTOR</option>
            </select>
            <label for="">CORREO</label>
            <input type="email" v-model="correo" />
            <label for="">CLAVE</label>
            <input type="password" v-model="clave" />
            <label for="">REINTRODUZCA LA CLAVE</label>
            <input type="password" v-model="clave2" />

          </section>
        </div>
      </fieldset>
      <div class="form-content-newuser2">
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

import { ref } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'

/* router */
import { useRouter, useRoute } from 'vue-router'
/* Te da acceso a la información de la ruta actual. */
let route = useRoute()
let id_persona = ref(route.params.id)
let router = useRouter()

let nombre_usuario = ref('')
let correo = ref('')
let clave = ref('')
let clave2 = ref('')
let id_rol = ref('')

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
  if (!nombre_usuario.value || !correo.value || !clave.value || !clave2.value || !id_rol.value) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: `Por favor complete todos los campos`,
    })
    return
  }
  const formData = new FormData()
  formData.append('nombre_usuario', nombre_usuario.value)
  formData.append('correo', correo.value)
  formData.append('clave', clave.value)
  formData.append('imagenPerfil', archivoImagen.value)
  formData.append('id_persona', id_persona.value)
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
      const resultado = await axios.post('http://localhost:3000/api/v1/users/register', formData, {
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
/* contenedor principal que abarca toda la pantalla */
  .container-newuser {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 85dvh;
  }
  .form-content{
    background-color: var(--color-white);
    border-radius: 20px;
    padding: 10px;
  }

.form-newuser {
  display: flex;
  flex-direction: column;
  background-color:  var(--color-white);
  border: none;
  row-gap: 20px;
  /* 👇 Control de altura y scroll interno */
  max-height: 70vh; /* ocupa como máximo el 90% de la pantalla */
  overflow-y: auto; /* scroll vertical si se desborda */
}

.form-content-newuser2 {
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
  padding-top: 10px;
}

.form-content-newuser {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  color: var(--color-black);
}

.content-newuser {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
}

.content-newuser > input, select {
  padding-left: 5px;
  border-radius: 20px;
    outline: none;
    border:2px solid var(--color-primary);
    height: 25px;
    font-weight: bold;
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
}

.input-file:hover {
  background-color: rgb(224, 63, 62);
}
.legend-newuser {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.titulo-newuser {
  display: flex;
  background-color: var(--color-primary);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
}

.form-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--color-white);
  font-weight: bold;
  border-radius: 20px;
  outline: none;
  border: none;
  min-width: 200px;
  height: 30px;
}

.form-btn:hover {
  background-color: rgb(224, 63, 62);
}

.btn-cancel{
    background-color: var(--color-secondary);
  }

  .btn-cancel:hover{
    background-color: var(--color-secondary-transparent);
    transition: .3s;
  }

  .btn-accept{
    background-color: var(--color-primary);
  }

  .btn-accept:hover{
    background-color: var(--color-primary-transparent);
    transition: .3s;
  }
/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
  .form-content-newuser2 {
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
