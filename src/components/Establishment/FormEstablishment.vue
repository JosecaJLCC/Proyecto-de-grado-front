<template>
  <div class="container-form-microredz">
    <form action="" v-on:submit.prevent="createEstablishment" class="form-content">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <span class="titulo-form-microred">NUEVO ESTABLECIMIENTO</span>
        </legend>
        <div class="form-content-microred">
          <section class="content-microred">
            <label for="">NOMBRE DEL ESTABLECIMIENTO</label>
            <input type="text" v-model="establishment.nombre_establecimiento">
            <label for="">TIPO DE ESTABLECIMIENTO</label>
            <select v-model="establishment.tipo_establecimiento" name="" id="">
              <option value="CENTRO DE SALUD">CENTRO DE SALUD</option>
              <option value="CONSULTORIO VECINAL">CONSULTORIO VECINAL</option>
            </select>
            <label for="">MICRORED</label>
            <select v-model="establishment.id_microred" name="" id="">
              <option :value="item.id_microred" v-for="item in resultMicrored" :key="item.id_microred">{{ item.nombre_microred }}</option>
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
            <input type="text" v-model="direction.municipio">
            <label for="">ZONA</label>
            <input type="text" v-model="direction.zona">
            <label for="">AVENIDA/CALLE</label>
            <input type="text" v-model="direction.av_calle">
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
  resultMicrored.value = await microredService.showMicrored();
})

const createEstablishment = async() =>{
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
  /* contenedor principal que abarca toda la pantalla */
  .container-form-microredz{
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

  .form-content-microred2{
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
    padding-top: 10px;
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
