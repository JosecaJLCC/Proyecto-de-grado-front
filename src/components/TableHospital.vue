<template>
  <div v-if="registros>0" class="container-tablehospital" >
    <div class="content-tablehospital">
      <div class="header-tablehospital">
        <section class="search-tablehospital">
          <button class="btn-agregar-cs" v-on:click="agregarHospital">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-home-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
             Agregar Establecimiento
          </button>
          <section class="input-tablehospital">
            <input type="text" placeholder="CENTRO DE SALUD" class="input-text-search" v-model="nombreBuscado">
            <CIcon :icon="cilSearch" class="icon-tablehospital"/>
          </section>
        </section>
      </div>
      <table class="table-attention">
        <thead>
          <tr>
            <th>N°</th>
            <th>CENTRO DE SALUD</th>
            <th>ZONA</th>
            <th>CALLE/AVENIDA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, Nro) of datosFiltrados" v-bind:key="data.id_establecimiento">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="CENTRO DE SALUD">{{ data.nombre_establecimiento}}</td>
            <td data-title="ZONA">{{ data.zona }}</td>
            <td data-title="CALLE/AVENIDA">{{ data.av_calle }}</td>
            <td data-title="ACCIONES">
              <div class="content-btn-actions">
                <button class="btn-acciones btn-view" v-on:click="verHospital">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                </button>
                <button class="btn-acciones btn-edit" v-on:click="editarHospital">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                </button>
                <button class="btn-acciones btn-delete" v-on:click="eliminarHospital(data.id_establecimiento)">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormCentroSalud class="content-form-cs" v-if="modalVisibleAgregar" @modificarModalAgregar="ocultarModalAgregar"/>
    <EditCentroSalud class="content-edit-cs" v-if="modalVisibleEditar" @modificarModalEditar="ocultarModalEditar"/>
  </div>
  <div v-else class="alternative-div">
     <h2>NO SE ENCONTRARON REGISTROS</h2>
  </div>
</template>

<script setup>
import '@/assets/styles/table.css';
import { establecimientoService } from '@/services/Establecimiento.js';
import FormCentroSalud from './FormCentroSalud.vue';
import EditCentroSalud from './EditCentroSalud.vue';
import { computed, onMounted, ref } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';


let datos = ref([]);
let datosOriginales = ref([]);
let nombreBuscado = ref("");
let registros = ref(0);
let modalVisibleAgregar = ref(false)
let modalVisibleEditar = ref(false)
let modalVisibleVer = ref(false)


const datosFiltrados = computed(() => {
  const centro_salud = nombreBuscado.value.trim();
  return centro_salud === ""
    ? datos.value
    : datosOriginales.value.filter(data =>
      data.nombre_establecimiento.toString().includes(centro_salud.toUpperCase()));
});


const obtenerEstablecimientos = async() => {
  try {
    let resultado = await establecimientoService.obtenerEstablecimiento();
    datos.value=resultado.data.resultado
    console.log(datos.value);
    registros.value=resultado.data.resultado.length;
    datosOriginales.value = [...resultado.data.resultado];
  } catch (error) {
    console.log("Error al obtener los datos:", error)
  }
}

onMounted(async()=>{
  obtenerEstablecimientos();
})
/* boton de agregar nuevo cs */
const agregarHospital = () =>{
  modalVisibleAgregar.value = true;
}

const ocultarModalAgregar = (valor) =>{
  modalVisibleAgregar.value = valor;
  obtenerEstablecimientos();
}
/* boton de editar cs */
const editarHospital = () =>{
  modalVisibleEditar.value = true;
}

const ocultarModalEditar = (valor) =>{
  modalVisibleEditar.value = valor;
  obtenerEstablecimientos();
}

/* boton eliminar cs */
const eliminarHospital = (id_establecimiento) =>{
  console.log("mi id:",id_establecimiento);
  /* await establecimientoService.eliminarEstablecimiento(id_establecimiento) */
}
</script>

<style scoped>
  .container-tablehospital {
    color: black;
    padding-left: 3px;
    transition: width 0.3s ease;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    position:relative;
  }

  .content-tablehospital{
    width: 100%;
    position:relative;
    /* min-height: 100vh; */
  }

  .content-form-cs, .content-edit-cs {
    position: absolute; /* o fixed, si prefieres */
    top: 0px;
    left: 0;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(255, 255, 255, 0.5); /* blanco semitransparente */
    backdrop-filter: blur(5px); /* 🔥 Aquí se hace el desenfoque */
    -webkit-backdrop-filter: blur(5px); /* compatibilidad con Safari */
    z-index: 10;
  }

  .alternative-div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .header-tablehospital {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 80px;
    padding: 10px;
  }

  .search-tablehospital {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    row-gap:10px;
    width: 100%;
    flex-wrap: wrap;
  }

  .input-tablehospital {
    display: flex;
    position: relative;
    align-items: center;
  }

  .icon-tablehospital {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 5px;
  }

  .input-text-search {
    padding-left: 25px;
    border-radius: 20px;
  }

  .btn-agregar-cs{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgb(0, 128, 128);
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 5px 10px;
  }

  .btn-agregar-cs:hover{
    background-color: rgb(224, 63, 62);
  }

  .btn-search {
    background-color: rgb(0, 128, 128);
    color: white;
    width: 150px;
    border-radius: 20px;
    outline: none;
    border: none;
    font-weight: bold;
  }

  .btn-search, .input-text-search, .btn-agregar-cs {
  font-size: 1.3em;
  height: 35px;
  }

  .date-tablehospital {
  background-color: rgb(0, 128, 128);
  color: white;
  padding: 5px;
  border-radius: 20px;
  }



  .btn-attention{
    background-color: rgb(0, 128, 128);
    color: white;
    width: 100px;
    border-radius: 20px;
    outline: none;
    border: none;
    font-weight: bold;
  }

  .btn-acciones{
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 50%;
    outline: none;
    border: none;
  }

  .btn-view{
    background-color: rgb(0, 128, 128);
  }

  .btn-edit{
    background-color: rgb(229, 229, 25);
  }

  .btn-delete{
    background-color: rgb(224, 63, 62);
  }
</style>
