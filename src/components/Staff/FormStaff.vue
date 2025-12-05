<template>
  <div class="container-form-modal">
    <form action="" v-on:submit.prevent="createStaff" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">NUEVO PERSONAL</span>
        </legend>
          <section class="register-form-modal">
            <label for="">CI</label>
            <input
              type="text"
              v-model="person.ci"
              pattern="^[A-Za-z0-9 ]+$"
              title="Solo se permiten letras y números">
            <label for="">NOMBRES</label>
            <input
              type="text"
              v-model="person.nombre"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">AP. PATERNO</label>
            <input
              type="text"
              v-model="person.paterno"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">AP. MATERNO</label>
            <input
              type="text"
              v-model="person.materno"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">TELEFONO</label>
            <input
              type="text"
              v-model="person.nro_telf"
              pattern="^[0-9]+$"
              title="Solo se permiten números">
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
            <input
              type="text"
              v-model="residence.municipio"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">ZONA</label>
            <input
              type="text"
              v-model="residence.zona"
              pattern="^[A-Za-z0-9-]+$"
              title="Solo se permiten letras, números y guion (-)">
            <label for="">AVENIDA/CALLE</label>
            <input
              type="text"
              v-model="residence.av_calle"
              pattern="^[A-Za-z0-9-]+$"
              title="Solo se permiten letras, números y guion (-)">
            <label for="">NRO PUERTA</label>
            <input
              type="text"
              v-model="residence.nro_puerta"
              pattern="^[0-9]+$"
              title="Solo se permiten números">
            <label for="">MICRORED DE SALUD</label>
            <select name="" id="" v-model="staff.id_microred">
              <option :value="item.codigo" v-for="item in resultMicrored" :key="item.codigo">{{ item.nombre_microred }}</option>
            </select>
            <label for="">PROFESION</label>
            <select name="" id="" v-model="staff.id_profesion" @change="chooseProfesion">
              <option :value="item.id" v-for="item in resultProfession" :key="item.id">{{ item.nombre_profesion }}</option>
              <option value="OTRO">OTRO</option>
            </select>
            <input
              v-if="profesionValue"
              placeholder="Ingrese la profesion"
              type="text"
              v-model="staff.nombre_profesion"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">AREA</label>
            <select name="" id="" v-model="staff.id_area" @change="chooseWorkArea">
              <option :value="item.id" v-for="item in resultWorkArea" :key="item.id">{{ item.nombre_area }}</option>
              <option value="OTRO">OTRO</option>
            </select>
            <input
              v-if="workAreaValue"
              placeholder="Ingrese el area de trabajo"
              type="text"
              v-model="staff.nombre_area"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <label for="">CARGO</label>
            <input
              placeholder="Ingrese el cargo"
              type="text"
              list="cargo"
              v-model="staff.cargo"
              pattern="^[A-Za-z ]+$"
              title="Solo se permiten letras">
            <datalist id="cargo">
              <option :value="item.cargo" v-for="item in resultPosition" :key="item.cargo">{{ item.cargo }}</option>
            </datalist>
            <label for="">MATRICULA</label>
            <input type="text" v-model="staff.nro_matricula">
            <label for="">FECHA DE INGRESO</label>
            <input type="date" v-model="staff.fecha_ingreso">
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
import { Personal } from '@/models/Personal.js';
import { microredService } from '@/services/Microred.js';
import { staffService } from '@/services/Personal.js';

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

let staff=reactive({
  id_microred:"",
  id_profesion:"",
  nombre_profesion:"",
  id_area:"",
  nombre_area:"",
  cargo:"",
  nro_matricula:"",
  fecha_ingreso:""
})

let residence=reactive({
  departamento:"",
  municipio:"",
  zona:"",
  av_calle:"",
  nro_puerta:""
})

let resultMicrored = ref({});
let resultProfession = ref([]);
let resultPosition = ref([]);
let resultWorkArea = ref([]);

let result = ref({});
let profesionValue=ref(false);
let workAreaValue=ref(false);

const emits = defineEmits(['modifyModalAdd']);
const sendValueModal = () => {
  emits('modifyModalAdd', false)
}

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored(1);
  resultProfession.value = await staffService.showProfession();
  resultPosition.value = await staffService.showPosition();
  resultWorkArea.value = await staffService.showWorkArea();
})

const chooseProfesion=()=>{
  if(staff.id_profesion=="OTRO"){
    profesionValue.value=true;
    staff.id_profesion=""
    return;
  }
  profesionValue.value=false;
}

const chooseWorkArea=()=>{
  if(staff.id_area=="OTRO"){
    workAreaValue.value=true;
    staff.id_area=""
    return;
  }
  workAreaValue.value=false;
}

const createStaff = async() =>{
  if(!person.ci || !person.nombre || !person.paterno ||
  !person.materno || !person.nro_telf || !person.estado_civil ||
  !person.fecha_nacimiento || !person.nacionalidad || !person.sexo ||
  !residence.departamento || !residence.municipio || !residence.zona || !residence.av_calle ||
    !residence.nro_puerta || !(staff.id_profesion || staff.nombre_profesion) ||
    !(staff.id_area || staff.nombre_area) || !staff.cargo) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

  let staffClass=new Personal(
    person.ci, person.nombre.toUpperCase(),
    person.paterno.toUpperCase(), person.materno.toUpperCase(),
    person.nacionalidad.toUpperCase(), person.estado_civil.toUpperCase(),
    person.nro_telf, person.sexo.toUpperCase(),
    person.fecha_nacimiento, residence.departamento.toUpperCase(),
    residence.municipio.toUpperCase(), residence.zona.toUpperCase(),
    residence.av_calle.toUpperCase(), residence.nro_puerta,
    staff.id_microred, staff.cargo.toUpperCase(),
    staff.id_profesion,
    staff.nombre_profesion.toUpperCase(), staff.id_area,
    staff.nombre_area.toUpperCase(),
    staff.nro_matricula, staff.fecha_ingreso
  );

  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se registrará el personal",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Agregar registro"
    })

    if (resultSwal.isConfirmed) {
      
      result.value = await staffService.createStaff(staffClass);

      if(result.value.ok){
        Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Tus datos fueron registrados",
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
      console.log("Error en registrar personal ", error)
    }
  }
</script>

<style scoped>
</style>
