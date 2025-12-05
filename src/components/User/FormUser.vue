<template>
  <div class="container-form-modal">
    <form @submit.prevent="createUser" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVO USUARIO</span>
        </legend>
        <div class="register-div-modal">
          <section class="register-form-modal">
            <label for="">DOCUMENTO DE IDENTIDAD</label>
            <input
              type="text"
              v-model="ci"
              placeholder="Ingrese solo el número"
              pattern="^[A-Za-z0-9 ]+$"
              title="Solo se permiten letras y números">
            <button class="form-btn btn-accept" v-on:click.prevent="verifyUser">VERIFICAR</button>
          </section>
          <section class="register-form-modal">
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
let result = ref({});

let ci=ref('');
let resultSearch=ref([]);

let archivoImagen = ref(null)

const emits = defineEmits(['modifyModalAdd']);
const sendValueModal = () => {
  emits('modifyModalAdd', false)
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
      title: '¿Estás seguro?',
      text: 'Se registrará un nuevo usuario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: 'Aceptar registro',
    })

    if (resultSwal.isConfirmed) {
      result.value = await  userService.createUser(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      if(result.value.ok){
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: result.value.message,
          icon: 'success',
        })
        sendValueModal();
      }
      else{
        Swal.fire({
          title: '¡Registro no realizado!',
          text: result.value.message,
          icon: 'error',
        })
      }
    }
  } catch (error) {
    console.log('error en agregar usuario', error)
  }
}

const verifyUser = async () => {
  if (!ci.value) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: `Por favor complete todos los campos`,
    })
    return
  }
  try {
    resultSearch.value = await userService.searchUser(ci.value)

    if(!resultSearch.value.ok){
      Swal.fire({
        title: '¡Algo salió mal!',
        text: `${resultSearch.value.message}`,
        icon: 'warning',
      })
    }
    else{
      nombre_usuario.value=concatUserName(ci, resultSearch.value.data.nombres);
      clave.value=nombre_usuario.value;
      id_personal.value=resultSearch.value.data.id_personal;
    }
  }
  catch (error) {
    console.log('errorPatient', error)
  }
}

const concatUserName=(ci, fullname)=>{
  let name=fullname.split(" ");
  let acronyms=""
  name.forEach((item)=> {acronyms+=item.slice(0,1).toLowerCase()})
  return ci.value+acronyms;
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
