<template>
    <div class="container-newregister">
      <fieldset class="form-newregister">
        <legend class="legend-newregister">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newregister"/> -->
           <span class="titulo-newregister">DATOS PERSONALES</span>
        </legend>

        <div class="form-content-newregister">
          <section class="content-newregister">
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
          </section>

          <section class="content-newregister">
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
          </section>

          <section class="content-newregister">
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
          </section>
        </div>
        <div class="form-content-newregister2">
          <button class="form-btn btn-cancel" v-on:click="retornarInicio"><CIcon :icon="cilX" class="icon-newregister"/>CANCELAR</button>
          <button class="form-btn btn-accept" v-on:click="registrarPersona"><CIcon :icon="cilCheckAlt" class="icon-newregister"/>CONTINUAR</button>
        </div>

      </fieldset>
    </div>
</template>

<script setup>
import { CIcon } from '@coreui/icons-vue';
import { cilCheckAlt, cilX } from '@coreui/icons';
import { ref, defineProps } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Persona } from '@/models/Persona.js';
/* router */
import { useRouter } from 'vue-router';
let router = useRouter();

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

const props = defineProps({
  redirectTo: {
    type: String,
    required: true
  }
});

const retornarInicio = () => {
  router.push({name: 'inicio'})
}

const registrarPersona = async() =>{
  if(!ci.value || !extension.value || !nombre.value || !paterno.value || !materno.value || !nacionalidad.value ||
               !estado_civil.value || !nro_telf.value || !sexo.value || !fecha_nacimiento.value ||
               !departamento.value || !municipio.value || !zona.value || !av_calle.value || !nro_puerta.value) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

   /* Llamamos al modal persona para recoger los datos */
   let persona = new Persona(ci.value, extension.value, nombre.value, paterno.value, materno.value, nacionalidad.value,
               estado_civil.value, nro_telf.value, sexo.value, fecha_nacimiento.value,
               departamento.value, municipio.value, zona.value, av_calle.value, nro_puerta.value);
               console.log("persona", persona)
  try {
    let resultSwal = await Swal.fire({
    title: "¿Estas seguro?",
    text: "Se registrara nuevos datos",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Agregar registro"
  })
/* me quede aca en esta vista, el front sigue avanzando */
  if (resultSwal.isConfirmed) {
    const resultado = await axios.post('http://localhost:3000/api/v1/people/register', persona);
    console.log("myRes",resultado)
    if(!resultado.data.ok){
      Swal.fire({
        title: "¡Error!",
        text: "El registro ya existe",
        icon: "error"
      });
    }
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Tus datos han sido registrados",
      icon: "success"
    });
    console.log("mi ruta: ", props.redirectTo)
    if(props.redirectTo=="inicio"){
      router.push({ name: props.redirectTo});
    }
    else{
      router.push({ name: props.redirectTo, params:{id:ci}});
    }

  };
  } catch (error) {
    console.log("errorPatient", error)
  }

}

</script>

<style scoped>
.container-newregister{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

  }

  .form-newregister{
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 128, 128, .7);
    border: none;
    padding: 20px;
    row-gap: 20px;
  }

  /* NOTA: no funciona con grid maldita sea cambiare a flex */
  .form-content-newregister {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    /* max-width: 800px; */
  }

  .content-newregister{
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .content-newregister > input{
    padding-left:5px;
  }

  input, select/* , .form-btn  */{
    border-radius: 20px;
    outline: none;
    border: none;
    /* width: 100%; */
    height: 20px;
  }

  .legend-newregister{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .titulo-newregister {
    display: flex;
    /* background-color: rgb(224, 63, 62); */
    background-color: rgb(0, 128, 128);
    border-radius: 20px;
    padding: 5px;
    font-weight: bold;
  }

  .icon-newregister{
    width: 20px;
    height: 20px;
    /* background-color: rgb(224, 63, 62) */;
  }

  .form-content-newregister2{
    display: flex;

    justify-content: space-around;
  }

  .form-btn{
    background-color: rgb(0, 128, 128);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    outline: none;
    border: none;
    min-width: 200px;
    height: 30px;
  }

  .form-btn:hover{
    background-color: rgb(224, 63, 62);
  }

  /* Tres columnas en pantallas grandes */
@media (min-width: 1024px) {
  .form-content-newregister {
    grid-template-columns: repeat(3, 1fr);
  }

}

@media (min-width: 768px) and (max-width: 1023px) {
  .form-content-newregister {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .form-content-newregister {
    grid-template-columns: repeat(1, 1fr);
  }

  .form-content-newregister2{
    flex-direction: column;
    row-gap: 20px;
  }
}

</style>
