<template>
  <div class="container-form-microred">
    <form action="" v-on:submit.prevent="editEstablishment" class="form-content">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <span class="titulo-form-microred">EDITAR PERSONAL</span>
        </legend>
        <div class="form-content-microred">
          <section class="content-microred">
            <label for="">CI</label>
            <input type="text" v-model="person.ci">
            <label for="">EXPEDIDO</label>
            <select name="" id="" v-model="person.extension">
              <option value="LP">LP</option>
              <option value="SC">SC</option>
              <option value="CB">CB</option>
              <option value="PT">PT</option>
              <option value="OR">OR</option>
              <option value="BN">BN</option>
              <option value="PD">PD</option>
              <option value="TJ">TJ</option>
              <option value="CH">CH</option>
            </select>
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

            <label for="">MICRORED DE SALUD</label>
            <select name="" id="" v-model="staff.id_microred">
              <option :value="item.id_microred" v-for="item in resultMicrored" :key="item.id_microred">{{ item.nombre_microred }}</option>
            </select>
            <label for="">PROFESION</label>
            <select name="" id="" v-model="staff.id_profesion" @change="chooseProfesion">
              <option :value="item.id_profesion" v-for="item in resultProfession" :key="item.id_profesion">{{ item.nombre_profesion }}</option>
              <option value="OTRO">OTRO</option>
            </select>
            <input v-if="profesionValue" placeholder="Ingrese la profesion" type="text" v-model="staff.nombre_profesion">
            <label for="">AREA</label>
            <select name="" id="" v-model="staff.id_area" @change="chooseWorkArea">
              <option :value="item.id_area" v-for="item in resultWorkArea" :key="item.id_area">{{ item.nombre_area }}</option>
              <option value="OTRO">OTRO</option>
            </select>
            <input v-if="workAreaValue" placeholder="Ingrese el area de trabajo" type="text" v-model="staff.nombre_area">
            <label for="">CARGO</label>
            <input placeholder="Ingrese el cargo" type="text" list="cargo" v-model="staff.cargo">
            <datalist id="cargo">
              <option :value="item.cargo" v-for="item in resultPosition" :key="item.cargo">{{ item.cargo }}</option>
            </datalist>
            <label for="">MATRICULA</label>
            <input type="text" v-model="staff.nro_matricula">
            <label for="">FECHA DE INGRESO</label>
            <input type="date" v-model="staff.fecha_ingreso">
          </section>
        </div>
      </fieldset>
      <div class="form-content-microred2">
          <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 10l4 4m0 -4l-4 4" /></svg>CANCELAR</button>
          <button class="form-btn btn-accept" type="submit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>ACEPTAR</button>
        </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive} from 'vue';
import Swal from 'sweetalert2';
import { Personal } from '@/models/Personal.js';
import { microredService } from '@/services/Microred.js';
import { staffService } from '@/services/Personal.js';
let person=reactive({
  ci:"",
  extension:"",
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
let positionValue=ref(false);
let workAreaValue=ref(false);

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored();
  resultProfession.value = await staffService.showProfession();
  resultPosition.value = await staffService.showPosition();
  resultWorkArea.value = await staffService.showWorkArea();
})

const emits = defineEmits(['modifyModalEdit'])
let props = defineProps({
  id_personal: {
    type: Number, // o Array si envías varios roles/Microreds
    required: true,
  },
});


const sendValueModal = () => {
  emits('modifyModalEdit', false)
}

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

const choosePosition=()=>{
  if(staff.cargo=="OTRO"){
    positionValue.value=true;
    staff.cargo=""
    return;
  }
  positionValue.value=false;
}

const editEstablishment = async() =>{
  if(!person.ci && !person.extension && !person.nombre && !person.paterno &&
  !person.materno && !person.nro_telf && !person.estado_civil &&
  !person.fecha_nacimiento && !person.nacionalidad && !person.sexo &&
  !residence.departamento && !residence.municipio && !residence.zona && !residence.av_calle &&
  !residence.nro_puerta && !(staff.id_profesion && staff.nombre_profesion) &&
  !(staff.id_area || staff.nombre_area) && !staff.cargo){
    Swal.fire({
        title: "¡Intente nuevamente!",
        text: "Debe haber al menos un cambio",
        icon: "warning"
      });
      return;
  }
  let staffClass=new Personal(
    person.ci, person.extension, person.nombre.toUpperCase(),
    person.paterno.toUpperCase(), person.materno.toUpperCase(),
    person.nacionalidad.toUpperCase(), person.estado_civil.toUpperCase(),
    person.nro_telf, person.sexo.toUpperCase(),
    person.fecha_nacimiento, residence.departamento.toUpperCase(),
    residence.municipio.toUpperCase(), residence.zona.toUpperCase(),
    residence.av_calle.toUpperCase(), residence.nro_puerta,
    staff.id_microred, staff.cargo.toUpperCase(),
    staff.id_profesion, staff.nombre_profesion.toUpperCase(),
    staff.id_area, staff.nombre_area.toUpperCase(),
    staff.nro_matricula, staff.fecha_ingreso, props.id_personal
  );
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
      result.value = await staffService.updateStaff(staffClass);
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
  /* contenedor principal que abarca toda la pantalla */
  .container-form-microred{
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

  .form-microred{
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border: none;
    row-gap: 20px;
      /* 👇 Control de altura y scroll interno */
    max-height: 70vh; /* ocupa como máximo el 90% de la pantalla */
    overflow-y: auto; /* scroll vertical si se desborda */
  }

  .form-content-microred {
    gap: 20px;
    width: 100%;
    color: var(--color-black);
  }

  .content-microred{
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    /* background-color: rgba(0, 128, 128, .5); */
    width: 100%;
  }

 .content-microred > input,select{
    padding-left:5px;
    border-radius: 20px;
    outline: none;
    border:2px solid var(--color-primary);
    height: 25px;
    font-weight: bold;
  }


  .legend-form-microred{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .titulo-form-microred {
    display: flex;
    background-color: var(--color-primary);
    border-radius: 20px;
    padding: 5px;
    font-weight: bold;
  }

  .icon-microred{
    width: 20px;
    height: 20px;
  }

  .form-content-microred2{
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
    padding-top: 10px;
  }

  .form-btn{
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
    .form-content-microred2{
      flex-direction: column;
      row-gap: 20px;
    }
  }
</style>
