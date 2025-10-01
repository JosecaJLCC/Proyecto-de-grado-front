<template>
  <div class="container-form-microred">
    <form action="">
      <fieldset class="form-microred">
        <legend class="legend-form-microred">
          <!-- <CIcon :icon="cilUserPlus" class="icon-microred"/> -->
          <span class="titulo-form-microred">MICRORED</span>
        </legend>

        <div class="form-content-microred">
          <section class="content-microred">
            <p>CODIGO DE LA MICRORED: <strong>{{ props.microred.id_microred }}</strong></p>
            <p>NOMBRE DE LA MICRORED: <strong>{{ props.microred.nombre_microred }}</strong></p>
            <p>RED PERTENECIENTE: <strong>{{ props.microred.red }}</strong></p>
            <p>FECHA DE CREACION: <strong>{{ fecha_creacion }}</strong></p>
            <p>HORA DE CREACION: <strong>{{ hora }}</strong></p>
            <p>DIRECTOR:  <strong>{{ props.microred.nombres }}</strong></p>
            <p>CI DEL DIRECTOR:  <strong>{{ props.microred.ci }} {{ props.microred.extension }}</strong></p>
          </section>
        </div>
        <div class="form-content-microred2">
          <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>VOLVER</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
const emits = defineEmits(['modifyModalView'])
const sendValueModal = () => {
  emits('modifyModalView', false)
}

let props=defineProps({
  microred:{
    type: Object,
    required: true
  }
})
let fecha_creacion = props.microred.fecha_creacion.split(" ")[0];
let hora = props.microred.fecha_creacion.split(" ")[1];
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

