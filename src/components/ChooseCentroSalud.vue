<template>
  <div class="container-form-modal">
    <form v-on:submit.prevent="setSession" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">ROLES Y ESTABLECIMIENTOS</span>
      </legend>
        <section class="register-form-modal">
          <label for="">ROL</label>
          <select v-model="usuario_rol">
            <option value="" disabled selected>Selecciona una opción</option>
            <option :value="item" v-for="item in roles" :key="item.id_usuario">
              {{ item.nombre_rol }}
            </option>
          </select>
          <label for="">ESTABLECIMIENTO DE SALUD</label>
          <select v-model="establecimiento">
            <option value="" disabled selected>Selecciona una opción</option>
            <option :value="item" v-for="item in resultEstablishment" :key="item.id">
              {{ item.nombre_establecimiento }}
            </option>
          </select>
        </section>

        <div class="actions-form-modal">
          <button class="form-btn btn-cancel" type="button" v-on:click="enviarValorModal">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>
            CANCELAR
          </button>
          <button class="form-btn btn-accept" type="submit">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>
            ACEPTAR
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import '@/assets/styles/modalForm.css';
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { userService } from '@/services/Usuario.js'
import { useUsuarioStore } from '@/store/usuario.js'
import { useRouter } from 'vue-router'
import { establishmentService } from '@/services/Establecimiento.js'
const router = useRouter()
let usuarioStore = useUsuarioStore()
let roles = ref({})
let usuario_rol = ref('')
let establecimiento = ref('')
let resultEstablishment = ref({})
let result = ref({})
let props = defineProps({
  data: {
    type: Object, // o Array si envías varios roles/establecimientos
    required: true,
  },
})
roles.value = props.data


onMounted(async () => {
  try {
    resultEstablishment.value = await establishmentService.showEstablishment(1)
  } catch (error) {
    console.log('Error en eleccion de centro de salud', error)
  }
})

const setSession = async () => {
  try {

    if(!establecimiento.value || !usuario_rol.value){
      Swal.fire({
        icon: "warning",
        title: "Campos vacios",
        text: `Por favor complete todos los campos`,
      });
      return;
    }
    result.value = await userService.setSession({
      ...usuario_rol.value,
      id_establecimiento: establecimiento.value.id,
      nombre_establecimiento: establecimiento.value.nombre_establecimiento,
    })
    
    if (result.value.ok) {
      let resultSwal = await Swal.fire({
        title: '¿Iniciar Sesión?',
        html: `Usuario: ${usuario_rol.value.nombre_usuario}
              <br> Rol: ${usuario_rol.value.nombre_rol}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'rgb(5, 135, 137)',
        cancelButtonColor: 'rgb(224, 63, 62)',
        confirmButtonText: 'Iniciar Sesión',
      })
      if (resultSwal.isConfirmed) {
        localStorage.setItem('token', result.value.token)
        console.log('verificando...')
        await usuarioStore.cargarUsuario()
        router.push({
          name: 'inicio',
        })
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: ``,
        })
      }
    }
  } catch (error) {
    console.log('error setsession')
  }
}

const emits = defineEmits(['modificarModalChoose'])

const enviarValorModal = () => {
  emits('modificarModalChoose', false)
}
</script>

<style scoped>
</style>
