<template>
  <div class="container-form-microred">
    <form action="" v-on:submit.prevent="editMicrored" class="form-content">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <span class="titulo-form-microred">EDITAR MICRORED</span>
        </legend>

        <div class="form-content-microred">
          <section class="content-microred">
            <h3>CODIGO DE MICRORED: {{ props.id_microred }}</h3>

            <label for="">NOMBRE DE LA MICRORED</label>
            <input type="text" v-model="nombre_microred">
            <label for="">RED PERTENECIENTE</label>
            <input type="text" v-model="red">
            <label for="">CI DEL DIRECTOR</label>
            <input type="text" v-model="ci_director">
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
import { ref} from 'vue';
import Swal from 'sweetalert2';
import { Microred } from '@/models/Microred.js';
let nombre_microred=ref("");
let red=ref("");
let ci_director=ref("");
let result = ref({})

const emits = defineEmits(['modifyModalEdit'])
let props = defineProps({
  id_microred: {
    type: String,
    required: true,
  },
});
const sendValueModal = () => {
  emits('modifyModalEdit', false)
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
  let microred = new Microred(props.id_microred,
                              nombre_microred.value.toUpperCase(),
                              red.value.toUpperCase(),
                              ci_director.value
                );
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
      if(result.value.ok){
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
      console.log("error en editar la microred", error)
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
