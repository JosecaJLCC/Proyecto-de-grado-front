<template>
  <div class="container-choose-cs">
    <form action="" v-on:submit.prevent="setSession">
      <fieldset class="form-choose-cs">
        <legend class="legend-choose-cs">
          <!-- <CIcon :icon="cilUserPlus" class="icon-choose-cs"/> -->
          <span class="title-choose-cs">ROLES Y ESTABLECIMIENTOS</span>
        </legend>

        <div class="form-content-choose">
          <section class="content-choose-cs">
            <label for="">ROL</label>
            <select v-model="usuario_rol" @change="cargarEstablecimiento">
              <option value="" disabled selected>Selecciona una opción</option>
              <option :value="item" v-for="item in roles" :key="item.id_usuario">
                {{ item.nombre_rol }}
              </option>
            </select>

            <transition name="fade" mode="out-in">
              <select
                v-if="usuario_rol && usuario_rol.id_usuario_rol === 3"
                v-model="selectedEstablecimiento"
              >
                <option
                  v-for="item in establecimiento"
                  :key="item.id_establecimiento"
                  :value="item.id_establecimiento"
                >
                  {{ item.nombre_establecimiento }}
                </option>
              </select>
            </transition>
          </section>
        </div>
        <div class="form-content-choose2">
          <button class="form-btn btn-cancel" type="button" v-on:click="enviarValorModal">
            <CIcon :icon="cilX" class="icon-choose-cs" />CANCELAR
          </button>
          <button class="form-btn btn-accept" type="submit">
            <CIcon :icon="cilCheckAlt" class="icon-choose-cs" />CONTINUAR
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { CIcon } from '@coreui/icons-vue'
import { cilCheckAlt, cilX } from '@coreui/icons'
import { ref, defineEmits, defineProps, toRaw } from 'vue'
import Swal from 'sweetalert2'
import { userService } from '@/services/Usuario.js';
import { useUsuarioStore } from '@/store/usuario.js'
import { useRouter } from 'vue-router'
const router = useRouter()
let usuarioStore=useUsuarioStore();
let roles = ref({});
let usuario_rol = ref('');
let establecimiento = ref(null);
let selectedEstablecimiento = ref([]);
let result = ref({});
let props = defineProps({
  data: {
    type: Object, // o Array si envías varios roles/establecimientos
    required: true,
  },
});
roles.value = props.data;
console.log('mis props: ', props.data);

const cargarEstablecimiento = async () => {
  if (usuario_rol.value.id_usuario_rol == 3) {
    console.log('usuario', usuario_rol.value.id_usuario)
    establecimiento.value = await userService.chooseEstablishment(usuario_rol.value.id_usuario)
  }
  console.log("admin o dire ", usuario_rol.value)
}

const setSession = async() => {
  try {
    console.log("mi result setsession eeh1", usuario_rol.value);
    result.value=await userService.setSession({...usuario_rol.value, id_establecimiento: establecimiento.value?.id_establecimiento || null});
    console.log("mi result setsession eeh2", result.value);
    if(result.value.ok){
      let resultSwal=await Swal.fire({
        title: "¿Iniciar Sesión?",
        html: `Correo: ${usuario_rol.value.correo}
              <br> Rol: ${usuario_rol.value.nombre_rol}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
        confirmButtonText: "Iniciar Sesión"
      })
      if (resultSwal.isConfirmed) {
        localStorage.setItem('token', result.value.token)
        console.log("verificando...")
        await usuarioStore.cargarUsuario();
        router.push({
          name: 'inicio',
        })
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: ``,
        });
      }
    }

  } catch (error) {
    console.log("error setsession")
  }
}

const emits = defineEmits(['modificarModalChoose'])

const enviarValorModal = () => {
  emits('modificarModalChoose', false)
}
</script>

<style scoped>
/* contenedor principal que abarca toda la pantalla */
.container-choose-cs {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-choose-cs {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: none;
  padding: 20px;
  row-gap: 20px;
  border-radius: 20px;
}

.form-content-choose {
  gap: 20px;
  width: 100%;
  color: var(--color-black);
}

.content-choose-cs {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
}

select {
  border-radius: 20px;
  height: 25px;
  border: 2px solid var(--color-black);
  /* outline: none; */
}

.legend-choose-cs {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.title-choose-cs {
  display: flex;

  background-color: var(--color-primary);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
  color: var(--color-white);
}

.icon-choose-cs {
  width: 20px;
  height: 20px;
}

.form-content-choose2 {
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
}

.form-btn {
  background-color: var(--color-primary);
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

.btn-accept {
  background-color: var(--color-primary);
}

.btn-cancel {
  background-color: var(--color-secondary);
}

.btn-accept:hover {
  background-color: var(--color-primary-transparent);
  transition: .3s;
}

.btn-cancel:hover {
  background-color: var(--color-secondary-transparent);
  transition: .3s;
}

/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
  .form-content-choose2 {
    flex-direction: column;
    row-gap: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease; /* Cambia 0.3s a lo que necesites */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
