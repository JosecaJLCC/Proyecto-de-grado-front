<template>
  <div class="container-form-modal">
    <form action="" v-on:submit.prevent="editEstablishment" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">EDITAR ESTABLECIMIENTO</span>
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
              <option :value="item.id" v-for="item in resultMicrored" :key="item.id">{{ item.nombre_microred }}</option>
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
import { ref, onMounted, reactive} from 'vue';
import Swal from 'sweetalert2';
import { Establecimiento } from '@/models/Establecimiento.js';
import { establishmentService } from '@/services/Establecimiento';

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

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored(1);
})

const emits = defineEmits(['modifyModalEdit'])
const sendValueModal = () => {
  emits('modifyModalEdit', false)
}

let props = defineProps({
  id: {
    type: Number, // o Array si envías varios roles/Microreds
    required: true,
  },
});

const editEstablishment = async() =>{
  if(!direction.departamento && !direction.municipio &&
    !direction.zona && !direction.av_calle &&
    !establishment.nombre_establecimiento &&
    !establishment.id_microred && !establishment.tipo_establecimiento){
    Swal.fire({
        title: "¡Intente nuevamente!",
        text: "Debe haber al menos un cambio",
        icon: "warning"
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
  console.log("class ",establishmentClass)
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se editará la información del establecimiento",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Aceptar cambios"
    })

    if (resultSwal.isConfirmed) {
      result.value = await establishmentService.updateEstablishment(props.id, establishmentClass);
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
    };
  } catch (error) {
      console.log("Error en editar microred", error)
    }
  }
</script>

<style scoped>
</style>
