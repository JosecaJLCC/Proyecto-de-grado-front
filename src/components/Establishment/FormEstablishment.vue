<template>
  <div class="container-form-modal">
    <form action="" v-on:submit.prevent="createEstablishment" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVO ESTABLECIMIENTO</span>
        </legend>
          <section class="register-form-modal">
            <label for="">NOMBRE DEL ESTABLECIMIENTO</label>
            <input
              type="text"
              v-model="establishment.nombre_establecimiento"
              pattern="^[A-Za-z0-9 ]+$"
              title="Solo se permiten letras y números">
            <label for="">TIPO DE ESTABLECIMIENTO</label>
            <select v-model="establishment.tipo_establecimiento" name="" id="">
              <option value="CENTRO DE SALUD">CENTRO DE SALUD</option>
              <option value="CONSULTORIO VECINAL">CONSULTORIO VECINAL</option>
            </select>
            <label for="">MICRORED</label>
            <select v-model="establishment.id_microred" name="" id="">
              <option :value="item.codigo" v-for="item in resultMicrored" :key="item.id">{{ item.nombre_microred }}</option>
            </select>
             <label for="">DEPARTAMENTO</label>
            <select v-model="direction.departamento" name="" id="">
              <option value="LA PAZ">LA PAZ</option>
              <option value="ORURO">ORURO</option>
              <option value="POTOSI">POTOSI</option>
              <option value="COCHABAMBA">COCHABAMBA</option>
              <option value="SANTA CRUZ">SANTA CRUZ</option>
              <option value="TARIJA">TARIJA</option>
              <option value="BENI">BENI</option>
              <option value="PANDO">PANDO</option>
              <option value="CHUQUISACA">CHUQUISACA</option>
            </select>
            <label for="">MUNICIPIO</label>
            <input
              type="text"
              v-model="direction.municipio"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">ZONA</label>
            <input
              type="text"
              v-model="direction.zona"
              pattern="^[A-Za-z0-9-]+$"
              title="Solo se permiten letras, números y guion (-)">
            <label for="">AVENIDA/CALLE</label>
            <input
              type="text"
              v-model="direction.av_calle"
              pattern="^[A-Za-z0-9-]+$"
              title="Solo se permiten letras, números y guion (-)">
          </section>

      </fieldset>
      <div class="actions-form-modal">
        <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>CANCELAR</button>
        <button class="form-btn btn-accept" type="submit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>ACEPTAR</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import '@/assets/styles/modalForm.css';
import { microredService } from '@/services/Microred.js';
import { establishmentService } from '@/services/Establecimiento.js';
import { Establecimiento } from '@/models/Establecimiento.js';
import { ref, onMounted, reactive} from 'vue';
import Swal from 'sweetalert2';

let direction = reactive({
  departamento:"",
  municipio:"",
  zona:"",
  av_calle:""
})
let establishment = reactive({
  nombre_establecimiento:"",
  tipo_establecimiento:"",
  id_microred:""
})

let resultMicrored = ref({});
let result = ref({});

const emits = defineEmits(['modifyModalAdd']);
const sendValueModal = () => {
  emits('modifyModalAdd', false)
}

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored(1);
})

const createEstablishment = async() =>{
  console.log(direction, "+", establishment)
  if(!direction.departamento || !direction.municipio ||
    !direction.zona || !direction.av_calle ||
    !establishment.nombre_establecimiento ||
    !establishment.tipo_establecimiento || !establishment.id_microred) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

  let establishmentClass = new Establecimiento(
                          direction.departamento.toUpperCase(),
                          direction.municipio.toUpperCase(),
                          direction.zona.toUpperCase(),
                          direction.av_calle.toUpperCase(),
                          establishment.nombre_establecimiento.toUpperCase(),
                          establishment.tipo_establecimiento.toUpperCase(),
                          establishment.id_microred
                        );
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se registrará el establecimiento",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Agregar registro"
    })

    if (resultSwal.isConfirmed) {
      result.value = await establishmentService.createEstablishment(establishmentClass);
      if(result.value.ok){
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: result.value.message,
          icon: "success"
        });
        sendValueModal();
      }else{
        Swal.fire({
          title: "¡Registro no realizado!",
          text: result.value.message,
          icon: "error"
        });
      }
    };
  } catch (error) {
      console.log("Error al crear establecimiento", error)
    }
  }
</script>

<style scoped>
</style>
