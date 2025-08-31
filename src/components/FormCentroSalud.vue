<template>
  <div class="container-newhospital">
    <form action="" v-on:submit.prevent="registrarHospital">
      <fieldset class="form-newhospital">
        <legend class="legend-newhospital">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newhospital"/> -->
          <span class="titulo-newhospital">NUEVO CENTRO DE SALUD</span>
        </legend>

        <div class="form-content-newhospital">
          <section class="content-newhospital">
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
            <label for="">ESTABLECIMIENTO</label>
            <input type="text" v-model="nombre_establecimiento">
          </section>
        </div>
        <div class="form-content-newhospital2">
          <button class="form-btn btn-cancel" type="button" v-on:click="enviarValorModal"><CIcon :icon="cilX" class="icon-newhospital"/>CANCELAR</button>
          <button class="form-btn btn-accept" type="submit"><CIcon :icon="cilCheckAlt" class="icon-newhospital"/>CONTINUAR</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { establecimientoService } from '@/services/Establecimiento.js';
import { CIcon } from '@coreui/icons-vue';
import { cilCheckAlt, cilX } from '@coreui/icons';
import { ref, defineEmits} from 'vue';
import Swal from 'sweetalert2';
import { Establecimiento } from '@/models/Establecimiento.js';
/* router */

let departamento=ref("");
let municipio=ref("");
let zona=ref("");
let av_calle=ref("");
let nombre_establecimiento=ref("");

  const emits = defineEmits(['modificarModalAgregar'])

const enviarValorModal = () => {
  emits('modificarModalAgregar', false)
}

const registrarHospital = async() =>{
  if(!departamento.value || !municipio.value || !zona.value || !av_calle.value || !nombre_establecimiento.value) {
    Swal.fire({
      icon: "error",
      title: "Campos vacios",
      text: `Por favor complete todos los campos`,
    });
    return;
  }

  let establecimiento = new Establecimiento(
                        departamento.value, municipio.value, zona.value, av_calle.value, nombre_establecimiento.value);
              console.log("persona", establecimiento)
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se registrara nuevos datos",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008080",   // Teal
      cancelButtonColor: "#E03F3E",    // Rojo
      confirmButtonText: "Agregar registro"
    })

    if (resultSwal.isConfirmed) {
      const resultado = establecimientoService.crearEstablecimiento(establecimiento);
      console.log("myRes",resultado)
      Swal.fire({
        title: "¡Registro Exitoso!",
        text: "Tus datos han sido registrados",
        icon: "success"
      });
      enviarValorModal();
    };
  } catch (error) {
      console.log("errorPatient", error)
    }
  }
</script>

<style scoped>
/* contenedor principal que abarca toda la pantalla */
.container-newhospital{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-newhospital{
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 128, 128, .7);
  /* background-color: rgba(255,255,255,1); */
  border: none;
  padding: 20px;
  row-gap: 20px;

}

.form-content-newhospital {
  gap: 20px;
  width: 100%;
  color: black;
}

.content-newhospital{
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  /* background-color: rgba(0, 128, 128, .5); */
  width: 100%;
}

.content-newhospital > input{
  padding-left:5px;
}

input, select/* , .form-btn  */{
  border-radius: 10px;
  outline: none;
  border: none;
  height: 25px;
}

.legend-newhospital{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.titulo-newhospital {
  display: flex;
  /* background-color: rgb(224, 63, 62); */
  background-color: rgb(0, 128, 128);
  border-radius: 20px;
  padding: 5px;
  font-weight: bold;
}

.icon-newhospital{
  width: 20px;
  height: 20px;
  /* background-color: rgb(224, 63, 62) */;
}

.form-content-newhospital2{
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
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

/* Una columna en pantallas pequeñas */
@media (max-width: 767px) {
.form-content-newhospital2{
  flex-direction: column;
  row-gap: 20px;
}
}
</style>
