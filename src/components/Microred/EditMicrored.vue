<template>
  <div class="container-form-microred">
    <form action="" v-on:submit.prevent="editMicrored">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <!-- <CIcon :icon="cilUserPlus" class="icon-microred"/> -->
          <span class="titulo-form-microred">EDITAR MICRORED</span>
        </legend>

        <div class="form-content-microred">
          <section class="content-microred">
            <h3>CODIGO DE MICRORED: {{ props.id_director }}</h3>

            <label for="">NOMBRE DE LA MICRORED</label>
            <input type="text" v-model="nombre_microred">
            <label for="">RED PERTENECIENTE</label>
            <input type="text" v-model="red">
            <label for="">CI DEL DIRECTOR</label>
            <input type="text" v-model="ci_director">
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
import { ref, defineEmits, defineProps} from 'vue';
import Swal from 'sweetalert2';
import { Microred } from '@/models/Microred.js';
/* router */
let nombre_microred=ref("");
let red=ref("");
let ci_director=ref("");
let result = ref({})

const emits = defineEmits(['modificarModalEditar'])
let props = defineProps({
  id_director: {
    type: String, // o Array si envías varios roles/Microreds
    required: true,
  },
});
console.log("mi id",props.id_director)
const enviarValorModal = () => {
  emits('modificarModalEditar', false)
}

const editMicrored = async() =>{
  if(!nombre_microred.value && !red.value && !ci_director.value){
    Swal.fire({
        title: "¡Intente nuevamente!",
        text: "Debe haber al menos un cambio",
        icon: "warning"
      });
      return;
  }
  let microred = new Microred(props.id_director, nombre_microred.value, red.value, ci_director.value);
              console.log("microred", microred)
  try {
    let resultSwal = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Se editará la información de la microred",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(5, 135, 137)",
      cancelButtonColor: "rgb(224, 63, 62)",
      confirmButtonText: "Aceptar cambios"
    })

    if (resultSwal.isConfirmed) {
      result.value = await microredService.updateMicrored(microred);
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

  .content-microred > input{
    padding-left:5px;
    border: none;
    outline: none;
    border-bottom:2px solid var(--color-primary);
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
