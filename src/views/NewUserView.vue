<template>
  <div>
    <Sidebar/>
    <div class="container-newuser">

      <fieldset class="form-newuser">
        <legend class="legend-newuser">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newuser"/> -->
           <span class="titulo-newuser">DATOS DEL PERSONAL DE SALUD</span>
        </legend>

        <div class="form-content-newuser">
          <section class="content-newuser">
            <input type="file">
          </section>

          <section class="content-newuser">
            <label for="">PROFESION</label>
            <input type="text">

            <label for="">AREA</label>
            <select name="" id="" v-model="estado_civil">
                <option value="SOLTERO">A</option>
                <option value="CASADO">B</option>
                <option value="DIVORCIADO">C</option>
                <option value="VIUDO">D</option>
                <option value="CONCUBINATO">E</option>
              </select>

            <label for="">NOMBRE DE USUARIO</label>
            <input type="text" v-model="municipio">

            <label for="">CORREO</label>
            <input type="email" v-model="municipio">

            <label for="">ROL</label>
            <select name="" id="" v-model="sexo">
              <option value="MASCULINO">DIRECTOR</option>
              <option value="FEMENINO">PERSONAL</option>
            </select>
          </section>
        </div>
        <div class="form-content-newuser2">
          <button class="form-btn btn-cancel" ><CIcon :icon="cilX" class="icon-newuser"/>CANCELAR</button>
          <button class="form-btn btn-accept" v-on:click="registrarPersona"><CIcon :icon="cilCheckAlt" class="icon-newuser"/>CONTINUAR</button>
        </div>

      </fieldset>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilUserPlus, cilCheckAlt, cilX } from '@coreui/icons';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Persona } from '@/models/Persona.js';


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


const registrarPersona = async() =>{
  /* Llamamos al modal persona para recoger los datos */
  let persona = new Persona(ci, extension, nombre, paterno, materno, nacionalidad,
               estado_civil, nro_telf, sexo, fecha_nacimiento,
               departamento, municipio, zona, av_calle, nro_puerta);

  let resultSwal = await Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
/* me quede aca en frontend */
  if (resultSwal.isConfirmed) {
    const resultado = await axios.post('http://localhost:3000/api/v1/people/register', persona);
    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Tus datos han sido registrados",
      icon: "success"
    });
  };
}

</script>

<style scoped>
.container-newuser{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 300px;
    /* min-height: 100vh; */
    /* border: 2px solid gold; */
  }

  .form-newuser{
    display: flex;
    flex-direction: column;
    background-color: rgb(0, 128, 128);
    border: none;
    margin-top: 80px;
    /* border: 2px solid black; */
    border-radius: 20px;
    padding: 20px;
    row-gap: 20px;
  }

  /* NOTA: no funciona con grid maldita sea cambiare a flex */
  .form-content-newuser {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px; /* Espacio entre columnas y filas */
    max-width: 800px;
  }

  .content-newuser{
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    /* flex-grow: 1; */
    /* min-height: 100vh; */
   /*border: 2px solid green;*/
  }

  .content-newuser > input{
    padding-left:5px;
  }

  input, select/* , .form-btn  */{
    border-radius: 20px;
    outline: none;
    border: none;
    /* width: 100%; */
    height: 20px;
  }

  .legend-newuser{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .titulo-newuser {
    display: flex;
    background-color: rgb(224, 63, 62);
    border-radius: 20px;
    padding: 5px;
    font-weight: bold;
  }

  .icon-newuser{
    width: 20px;
    height: 20px;
    /* background-color: rgb(224, 63, 62) */;
  }

  .form-content-newuser2{
    display: flex;

    justify-content: space-around;
  }

  .form-btn{
    background-color: rgb(224, 63, 62);
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
    background-color: #00ffc8;
  }

  /* Tres columnas en pantallas grandes */
@media (min-width: 1024px) {
  .form-content-newuser {
    grid-template-columns: repeat(3, 1fr);
  }
  .form-content-newuser2{
    /* flex-direction: column; */
  }
}

/* Dos columnas en pantallas medianas */
@media (min-width: 768px) and (max-width: 1023px) {
  .form-content-newuser {
    grid-template-columns: repeat(2, 1fr);
  }
  /* .form-content-newuser2{
    flex-direction: column;
    row-gap: 20px;
  } */
}

/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
  .form-content-newuser {
    grid-template-columns: repeat(1, 1fr);
  }

  .form-content-newuser2{
    flex-direction: column;
    row-gap: 20px;
  }
}

</style>
