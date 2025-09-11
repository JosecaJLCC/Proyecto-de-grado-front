<template>
  <div class="container-form-microred">
    <form action="" v-on:submit.prevent="editEstablishment">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <!-- <CIcon :icon="cilUserPlus" class="icon-microred"/> -->
          <span class="titulo-form-microred">EDITAR MICRORED</span>
        </legend>

        <div class="form-content-microred">
          <section class="content-microred">
            <label for="">NOMBRE DEL ESTABLECIMIENTO</label>
            <input type="text" v-model="nombre_establecimiento">
            <label for="">TIPO DE ESTABLECIMIENTO</label>
            <select v-model="tipo_establecimiento" name="" id="">
              <option value="CENTRO DE SALUD">CENTRO DE SALUD</option>
              <option value="CONSULTORIO VECINAL">CONSULTORIO VECINAL</option>
            </select>
            <label for="">MICRORED</label>
            <select v-model="id_microred" name="" id="">
              <option :value="item.id_microred" v-for="item in resultMicrored" :key="item.id_microred">{{ item.nombre_microred }}</option>
            </select>
             <label for="">DEPARTAMENTO</label>
            <select v-model="departamento" name="" id="">
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
            <input type="text" v-model="municipio">
            <label for="">ZONA</label>
            <input type="text" v-model="zona">
            <label for="">AVENIDA/CALLE</label>
            <input type="text" v-model="av_calle">
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
import { ref, defineEmits, defineProps, onMounted} from 'vue';
import Swal from 'sweetalert2';
import { Microred } from '@/models/Microred.js';
import { Establecimiento } from '@/models/Establecimiento.js';
import { establishmentService } from '@/services/Establecimiento';
/* router */
let departamento = ref("");
let municipio = ref("");
let zona = ref("");
let av_calle = ref("");
let nombre_establecimiento=ref("");
let tipo_establecimiento=ref("");
let id_microred = ref("");
let resultMicrored = ref({});
let result = ref({});

onMounted(  async()=>{
  resultMicrored.value = await microredService.showMicrored();
  console.log("mi res:: ",resultMicrored.value)
})

const emits = defineEmits(['modificarModalEditar'])
let props = defineProps({
  id_establecimiento: {
    type: String, // o Array si envías varios roles/Microreds
    required: true,
  },
});
console.log("mi id",props.id_establecimiento)
const enviarValorModal = () => {
  emits('modificarModalEditar', false)
}

const editEstablishment = async() =>{
  if(!departamento.value && !municipio.value && !zona.value && !av_calle.value &&
     !nombre_establecimiento.value && !id_microred.value && !tipo_establecimiento.value){
    Swal.fire({
        title: "¡Intente nuevamente!",
        text: "Debe haber al menos un cambio",
        icon: "warning"
      });
      return;
  }
  let establishment = {
                id_establecimiento: props.id_establecimiento,
                departamento: departamento.value,
                municipio:municipio.value,
                zona:zona.value,
                av_calle:av_calle.value,
                nombre_establecimiento:nombre_establecimiento.value,
                id_microred:id_microred.value,
                tipo_establecimiento: tipo_establecimiento.value}
              console.log("microred", establishment)
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
      result.value = await establishmentService.updateEstablishment(establishment);
      console.log("my result", result.value)
      if(result.value.ok){
        console.log("myRes",result)
        Swal.fire({
          title: "¡Cambio exitoso!",
          text: "Tus datos fueron corregidos",
          icon: "success"
        });
        enviarValorModal();
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
