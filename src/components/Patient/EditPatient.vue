<template>
  <div class="container-form-modal">
    <form action="" v-on:submit.prevent="editEstablishment" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">EDITAR PACIENTE</span>
        </legend>
        <section class="register-form-modal">
            <label for="">CI</label>
            <input type="text" v-model="person.ci">
            <label for="">NOMBRES</label>
            <input type="text" v-model="person.nombre">
            <label for="">AP. PATERNO</label>
            <input type="text" v-model="person.paterno">
            <label for="">AP. MATERNO</label>
            <input type="text" v-model="person.materno">
            <label for="">TELEFONO</label>
            <input type="text" v-model="person.nro_telf">
            <label for="">ESTADO CIVIL</label>
            <select name="" id="" v-model="person.estado_civil">
              <option value="SOLTERO">SOLTERO/A</option>
              <option value="CASADO">CASADO/A</option>
              <option value="DIVORCIADO">DIVORCIADO/A</option>
              <option value="VIUDO">VIUDO/A</option>
              <option value="CONCUBINATO">CONCUBINATO/A</option>
            </select>
            <label for="">FECHA DE NACIMIENTO</label>
            <input type="date" v-model="person.fecha_nacimiento">
            <label for="">NACIONALIDAD</label>
            <select name="" id="" v-model="person.nacionalidad">
              <option value="BOLIVIANO">BOLIVIANO</option>
              <option value="EXTRANJERO">EXTRANJERO</option>
            </select>
            <label for="">SEXO</label>
            <select name="" id="" v-model="person.sexo">
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="OTRO">OTRO</option>
            </select>
            <label for="">MICRORED DE SALUD</label>
            <select name="" id="" v-model="patient.id_microred">
              <option :value="item.id_microred" v-for="item in resultMicrored" :key="item.id_microred">{{ item.nombre_microred }}</option>

            </select>
            <label for="">DEPARTAMENTO</label>
              <select name="" id="" v-model="residence.departamento">
                <option value="LA PAZ">LA PAZ</option>
                <option value="SANTA CRUZ">SANTA CRUZ</option>
                <option value="COCHABAMBA">COCHABAMBA</option>
                <option value="POTOSI">POTOSI</option>
                <option value="ORURO">ORURO</option>
                <option value="BENI">BENI</option>
                <option value="PANDO">PANDO</option>
                <option value="TARIJA">TARIJA</option>
                <option value="CHUQUISACA">CHUQUISACA</option>
              </select>
            <label for="">MUNICIPIO</label>
            <input type="text" v-model="residence.municipio">
            <label for="">ZONA</label>
            <input type="text" v-model="residence.zona">
            <label for="">AVENIDA/CALLE</label>
            <input type="text" v-model="residence.av_calle">
            <label for="">NRO PUERTA</label>
            <input type="text" v-model="residence.nro_puerta">
            <label for="">CARPETA</label>
            <input placeholder="Nombre de la carpeta" type="text" list="carpeta" v-model="patient.nombre_carpeta">
            <datalist id="carpeta">
              <option :value="item.nombre_carpeta" v-for="item in resultFolder" :key="item.nombre_carpeta">{{ item.nombre_carpeta }}</option>
            </datalist>
<!--             <label for="">COLOR</label>
            <input type="text" v-model="patient.color"> -->
            <label for="">TIPO DE SANGRE</label>
            <select name="" id="" v-model="patient.tipo_sangre">
              <option value="O-">O-</option>
              <option value="O+">O+</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
              <option value="B-">B-</option>
              <option value="B+">B+</option>
              <option value="A-">A-</option>
              <option value="A+">A+</option>
            </select>
            <label for="">PESO</label>
            <input type="text" v-model="patient.peso">
            <label for="">ESTATURA</label>
            <input type="text" v-model="patient.estatura">
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
import { ref, onMounted, reactive} from 'vue';
import Swal from 'sweetalert2';
import { Paciente } from '@/models/Paciente.js';
import { microredService } from '@/services/Microred.js';
import { patientService } from '@/services/Paciente.js';
/* router */
let person=reactive({
  ci:"",
  nombre:"",
  paterno:"",
  materno:"",
  estado_civil:"",
  fecha_nacimiento:"",
  nacionalidad:"",
  sexo:"",
  nro_telf:""
})

let residence=reactive({
  departamento:"",
  municipio:"",
  zona:"",
  av_calle:"",
  nro_puerta:""
})

let patient=reactive({
  id_microred : "",
  nombre_carpeta : "",
  tipo_sangre:"",
  peso:"",
  estatura:""
})

let resultMicrored = ref({});
let resultFolder = ref({});
let result = ref({});

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored(1);
  resultFolder.value=await patientService.showFolder();
})

const emits = defineEmits(['modifyModalEdit'])
let props = defineProps({
  id: {
    type: Number, // o Array si envías varios roles/Microreds
    required: true,
  },
});
console.log("mi id",props.id)
const sendValueModal = () => {
  emits('modifyModalEdit', false)
}

const editEstablishment = async() =>{
  if(!person.ci && !person.nombre && !person.paterno &&
  !person.materno && !person.nro_telf && !person.estado_civil &&
  !person.fecha_nacimiento && !person.nacionalidad && !person.sexo &&
  !residence.departamento && !residence.municipio &&
  !residence.zona && !residence.av_calle && !residence.nro_puerta &&
  !patient.id_microred && !patient.nombre_carpeta &&
  !patient.tipo_sangre && !patient.peso && !patient.estatura
     ){
    Swal.fire({
        title: "¡Intente nuevamente!",
        text: "Debe haber al menos un cambio",
        icon: "warning"
      });
      return;
  }
  let patientClass = new Paciente(
                  person.ci,
                  person.nombre.toUpperCase(),
                  person.paterno.toUpperCase(),
                  person.materno.toUpperCase(),
                  person.nacionalidad.toUpperCase(),
                  person.estado_civil.toUpperCase(),
                  person.nro_telf,
                  person.sexo.toUpperCase(),
                  person.fecha_nacimiento,
                  residence.departamento.toUpperCase(),
                  residence.municipio.toUpperCase(),
                  residence.zona.toUpperCase(),
                  residence.av_calle.toUpperCase(),
                  residence.nro_puerta,
                  patient.id_microred,
                  patient.nombre_carpeta.toUpperCase(),
                  patient.peso, patient.estatura,
                  patient.tipo_sangre
  );
  console.log("paciente: ",patientClass);
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se editará la información del paciente",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Aceptar cambios"
    })

    if (resultSwal.isConfirmed) {
      result.value = await patientService.updatePatient(id, patientClass);
      console.log("my result", result.value)
      if(result.value.ok){
        console.log("myRes",result)
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
      console.log("errorPatient", error)
    }
  }
</script>

<style scoped>
</style>
