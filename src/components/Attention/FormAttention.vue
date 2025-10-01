<template>
  <div class="container-form-microred">
    <form action="" v-on:submit.prevent="createPatient">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <!-- <CIcon :icon="cilUserPlus" class="icon-microred"/> -->
          <span class="titulo-form-microred">NUEVO PACIENTE</span>
        </legend>

        <div class="form-content-microred">
          <section class="content-microred">

            <label for="">CI</label>
          <input type="text" v-model="ci">
          <label for="">EXPEDIDO</label>
          <select name="" id="" v-model="extension">
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
          <input type="text" v-model="nombre">
          <label for="">AP. PATERNO</label>
          <input type="text" v-model="paterno">
          <label for="">AP. MATERNO</label>
          <input type="text" v-model="materno">
          <label for="">TELEFONO</label>
          <input type="text" v-model="nro_telf">
          <label for="">ESTADO CIVIL</label>
          <select name="" id="" v-model="estado_civil">
            <option value="SOLTERO">SOLTERO/A</option>
            <option value="CASADO">CASADO/A</option>
            <option value="DIVORCIADO">DIVORCIADO/A</option>
            <option value="VIUDO">VIUDO/A</option>
            <option value="CONCUBINATO">CONCUBINATO/A</option>
          </select>
          <label for="">FECHA DE NACIMIENTO</label>
          <input type="date" v-model="fecha_nacimiento">
          <label for="">NACIONALIDAD</label>
          <select name="" id="" v-model="nacionalidad">
            <option value="BOLIVIANO">BOLIVIANO</option>
            <option value="EXTRANJERO">EXTRANJERO</option>
          </select>
          <label for="">SEXO</label>
          <select name="" id="" v-model="sexo">
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
            <option value="OTRO">OTRO</option>
          </select>
          <label for="">MICRORED DE SALUD</label>
          <select name="" id="" v-model="id_microred">
            <option :value="item.id_microred" v-for="item in resultMicrored" :key="item.id_microred">{{ item.nombre_microred }}</option>

          </select>
          <label for="">DEPARTAMENTO</label>
            <select name="" id="" v-model="departamento">
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
          <input type="text" v-model="municipio">
          <label for="">ZONA</label>
          <input type="text" v-model="zona">
          <label for="">AVENIDA/CALLE</label>
          <input type="text" v-model="av_calle">
          <label for="">NRO PUERTA</label>
          <input type="text" v-model="nro_puerta">
          <label for="">CARPETA</label>
          <input type="text" v-model="nombre_carpeta">
          <label for="">COLOR</label>
          <input type="text" v-model="color">
          </section>
        </div>
        <div class="form-content-microred2">
          <button class="form-btn btn-cancel" type="button" v-on:click="enviarValorModal"><CIcon :icon="cilX" class="icon-microred"/>CANCELAR</button>
          <button class="form-btn btn-accept" type="submit"><CIcon :icon="cilCheckAlt" class="icon-microred"/>ACEPTAR</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { microredService } from '@/services/Microred.js';

import { CIcon } from '@coreui/icons-vue';
import { cilCheckAlt, cilX } from '@coreui/icons';
import { ref, onMounted} from 'vue';
import Swal from 'sweetalert2';
import { Paciente } from '@/models/Paciente.js';
import { patientService } from '@/services/Paciente';

/* router */
let ci=ref("");
  let extension=ref("");
  let nombre=ref("");
  let paterno=ref("");
  let materno=ref("");
  let nacionalidad=ref("");
  let fecha_nacimiento=ref("");
  let sexo=ref("");
  let estado_civil=ref("");
  let nro_telf=ref("");

  let departamento=ref("");
  let municipio=ref("");
  let zona=ref("");
  let av_calle=ref("");
  let nro_puerta=ref("");

  let id_microred=ref("");
  let nombre_carpeta = ref("");
  let color = ref("");

let resultMicrored = ref({});
let result = ref({});
const emits = defineEmits(['modificarModalAgregar']);

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored();
  console.log("mi res:: ",resultMicrored.value)
})

const enviarValorModal = () => {
  emits('modificarModalAgregar', false)
}

const createPatient = async() =>{
  if(!departamento.value || !municipio.value || !zona.value || !av_calle.value || !nro_puerta.value ||
    !ci.value || !extension.value || !nombre.value || !nacionalidad.value || !fecha_nacimiento.value ||
    !sexo.value || !estado_civil.value || !nro_telf.value || !id_microred.value || !nombre_carpeta.value) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

  let patient = new Paciente(ci.value, extension.value, nombre.value, paterno.value, materno.value,
                          nacionalidad.value, estado_civil.value, nro_telf.value,  sexo.value, fecha_nacimiento.value,
                          departamento.value, municipio.value, zona.value, av_calle.value, nro_puerta.value,
                          id_microred.value, nombre_carpeta.value, color.value);
  console.log("paciente: ",patient);
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se registrará el nuevo paciente",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Agregar registro"
    })

    if (resultSwal.isConfirmed) {
      result.value = await patientService.createPatient(patient);
      console.log("ok: ",result.value)
      if(result.value.ok){

        Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Tus datos fueron registrados",
          icon: "success"
        });
        enviarValorModal();
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
      console.log("Error fatal")
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
  }

  .form-microred{
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: 20px;
    border: none;
    padding: 20px;
    row-gap: 20px;
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
