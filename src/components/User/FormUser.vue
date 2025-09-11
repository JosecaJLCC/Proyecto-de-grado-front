<template>
  <div class="container-newuser">
    <form @submit.prevent="registrarUsuario">
      <fieldset class="form-newuser">
        <legend class="legend-newuser">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newuser"/> -->
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
          <img class="img-perfil" v-else src="../assets/usuario.png" alt="" />
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
            <!-- <CIcon :icon="cilPlus" class="icon-sidebar" /> -->
            <label for="">NOMBRE DE USUARIO</label>
            <input type="text" v-model="nombre_usuario" />
            <label for="">CORREO</label>
            <input type="email" v-model="correo" />
            <label for="">CLAVE</label>
            <input type="password" v-model="clave" />
            <label for="">REINTRODUZCA LA CLAVE</label>
            <input type="password" v-model="clave2" />
            <label for="">ROL</label>
            <select name="" id="" v-model="id_rol">
              <option value="2">PERSONAL</option>
              <option value="3">DIRECTOR</option>
            </select>
          </section>
        </div>
        <div class="form-content-newuser2">
          <button class="form-btn btn-cancel" v-on:click="retornarInicio">
            <CIcon :icon="cilX" class="icon-newuser" />CANCELAR
          </button>
          <button class="form-btn btn-accept" type="submit">
            <CIcon :icon="cilCheckAlt" class="icon-newuser" />CONTINUAR
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { CIcon } from '@coreui/icons-vue'
import { cilCheckAlt, cilX } from '@coreui/icons'
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

const retornarInicio = () => {
  router.push({ name: 'inicio' })
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

const registrarUsuario = async () => {
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
}

.form-newuser {
  display: flex;
  flex-direction: column;
  /* background-color: rgba(0, 128, 128, .4); */
  background-color: rgba(0, 128, 128, 0.5);
  border: none;
  padding: 20px;
  row-gap: 20px;
}

.form-content-newuser {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* border: 2px solid black; */
  width: 100%;
}

.content-newuser {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 20px;
  /* background-color: rgba(0, 128, 128, .5); */
  width: 100%;
  /* border: 2px solid silver */
}

.content-newuser > input {
  padding-left: 5px;
}

input, select/* , .form-btn  */ {
  border-radius: 20px;
  outline: none;
  border: none;
  /* width: 100%; */
  height: 20px;
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
  /* background-color: rgb(224, 63, 62); */
  background-color: rgb(0, 128, 128);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
}

.icon-newuser {
  width: 20px;
  height: 20px;
  /* background-color: rgb(224, 63, 62) */
}

.form-content-newuser2 {
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
}

.form-btn {
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

.form-btn:hover {
  background-color: rgb(224, 63, 62);
}

/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
  .form-content-newuser2 {
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
