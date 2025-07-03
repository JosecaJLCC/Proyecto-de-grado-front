<template>
  <div class="container-tablehospital" >
    <div class="header-tablehospital">
      <section class="search-tablehospital">
        <button class="btn-agregar-cs" v-on:click="agregarHospital">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          <strong> Agregar Establecimiento</strong>
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
            <!--  -->
              <td data-title="N°">{{ Nro + 1 }}</td>
              <td data-title="CENTRO DE SALUD">{{ data.nombre}}</td>
              <td data-title="ZONA">{{ data.zona }}</td>
              <td data-title="CALLE/AVENIDA">{{ data.av_calle }}</td>
              <td data-title="ACCIONES">
                <div class="content-btn-attention">
                    <router-link  :to="{ name: 'registrar-centro-salud', params: { id: id_establecimiento } }">
                      VER MÁS
                    </router-link>
                </div>
              </td>
          </tr>
      </tbody>
  </table>
  </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import { cilUser, cilLockLocked, cilLowVision, cilLockUnlocked, cilSearch, cilPlus } from '@coreui/icons';
import axios from 'axios';
import { useUsuarioStore } from '@/store/usuario.js';
import router from '@/router';

let usuarioStore = useUsuarioStore();
/* let usuario = usuarioStore.usuario; */

let datos = ref([]);
let datosOriginales = ref([])
let nombreBuscado = ref("");

const datosFiltrados = computed(() => {
const centro_salud = nombreBuscado.value.trim();
return centro_salud === ""
  ? datos.value
  : datosOriginales.value.filter(data => data.nombre.toString().includes(centro_salud));
});


onMounted(async()=>{
try {
  let resultado = await axios.get('http://localhost:3000/api/v1/stablishment/show')

  datos.value=resultado.data.resultado
  datosOriginales.value = [...resultado.data.resultado];

} catch (error) {
  console.log("Error al obtener los datos:", error)
}
})

const agregarHospital = () =>{
  router.push({name:"registrar-centro-salud"})
}
</script>

<style scoped>
.container-tablehospital {
color: black;
/* border: 3px solid green; */
padding-left: 3px;
transition: width 0.3s ease;
width: 100%;
max-width: 100%;
box-sizing: border-box;
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
width: 100%;
}

.fecha-header{
  background-color: rgb(0, 128, 128);
  color: white;
  padding: 5px;
  border-radius: 20px;
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
  padding: 5px;

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

.input-text-search {
padding-left: 25px;
border-radius: 20px;
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

.content-btn-attention {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
column-gap: 10px;
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

/* Tabla */
table {
border-collapse: collapse;
margin: 0;
width: 100%;
box-shadow: 0 0 5px rgba(0, 0, 0, -25);
/* border: 3px solid black; */
}

table tr {
padding: .45em;
}

thead tr {
background-color: rgb(0, 128, 128);
}

tbody tr:nth-child(even) {
background-color: rgba(0, 128, 128, .3);
}

table th, table td {
font-size: 1em;
padding: 1em;
text-align: center;
}

thead th {
color: white;
font-size: 1.15em;
}

@media (max-width: 800px) {
  .content-btn-attention {
    justify-content: end;
  }

  table thead tr {
    display: none;
  }

  table tr {
    display: block;
  }

  table th, table td {
    padding: .5em;
    text-align: right;
  }

  table td {
    text-align: right;
    display: block;
    font-size: 1em;
  }

  table td::before {
    content: attr(data-title)": ";
    float: left;
    font-weight: bold;
    color: #333;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(0, 128, 128, 0.1);
  }
}
</style>
