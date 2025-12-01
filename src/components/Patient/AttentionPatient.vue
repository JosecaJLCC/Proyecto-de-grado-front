<template>
  <div class="container-form-modal">
    <form @submit.prevent="createAttention" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVA ATENCIÓN</span>
        </legend>
          <section class="register-form-modal">
            <label for="">AREA DE ATENCIÓN</label>
            <select name="" id="" v-model="attention.id_area">
              <option :value=item.id v-for="item in resultArea" v-bind:key="item.id">{{ item.nombre_area }}</option>
            </select>
            <label for="">TURNO</label>
              <select name="" id="" v-model="attention.turno">
                <option value="MAÑANA">MAÑANA</option>
                <option value="TARDE">TARDE</option>
              </select>
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
import { onMounted, onUnmounted, reactive, ref, computed} from 'vue';
import Swal from 'sweetalert2';
import { staffService } from '@/services/Personal.js';
import { attentionService } from '@/services/Atencion.js';
import { useUsuarioStore } from '@/store/usuario.js';

let authStore = useUsuarioStore()
let usuario = computed(() => authStore.usuario)

let attention=reactive({
  id_area:0,
  estado_atencion:"EN ESPERA",
  id_usuario_rol_atencion:0,
  id_paciente:0,
  turno:""
})
attention.id_usuario_rol_atencion=usuario.value.id;

let resultArea=ref({});
let result=ref({});

const emits = defineEmits(['modifyModalAttention'])
let props = defineProps({
  id: {
    type: Number,
    required: true
  }
});
attention.id_paciente=props.id;

/* lista de atenciones en tiempo real */
let atenciones=ref([])

/* funcion que consulta cada 5s */
let intervalId=null;

const cargarAtenciones = async () => {
  try {
    const res = await attentionService.showAttention();
    if(res.ok){
      atenciones.value = res.data;
      console.log("Actualizado en tiempo real:", atenciones.value);
    }
  } catch (error) {
    console.error("Error en polling:", error);
  }
};



onMounted(async()=>{
  resultArea.value=await staffService.showWorkArea();
  /* primera carga */
  cargarAtenciones();
  /* polling cada 5 segundos */
  intervalId=setInterval(cargarAtenciones, 5000)
})

// limpiar el intervalo al salir del componente
onUnmounted(() => {
  clearInterval(intervalId);
});

const sendValueModal = () => {
  emits('modifyModalAttention', false)
}

const createAttention=async()=>{
  if(!attention.id_area || !attention.turno){
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }
  console.log("datos de atencion: ", attention)
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se registrará la petición de atención",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Agregar registro"
    })
    if (resultSwal.isConfirmed) {
      result.value = await attentionService.createAttention(attention);
      console.log("ok: ",result.value)
      if(result.value.ok){
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Tus datos fueron registrados",
          icon: "success"
        });
        /* refrescar de inmediato despues de registrar */
        await cargarAtenciones();
        sendValueModal();
      }else{
        console.log(result.value)
        Swal.fire({
          title: "¡Registro no realizado!",
          text: result.value.message,
          icon: "error"
        });
      }
    };
  } catch (error) {
      console.log("Error fatal en atencion", error)
    }
}
</script>

<style scoped>

</style>
