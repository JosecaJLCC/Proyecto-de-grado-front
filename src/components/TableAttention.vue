<template>
    <div v-if="registros>0" class="container-tableattention" >
      <header class="header-tableattention">
        <section class="search-tableattention">
          <section class="input-tableattention">
            <input type="text" placeholder="INGRESE SU CI" class="input-text-search" v-model="ciBuscado">
            <CIcon :icon="cilSearch" class="icon-tableattention"/>
          </section>

        </section>
      </header>
      <table class="table-attention">
        <thead>
            <tr>
                <th>N°</th>
                <th>CI</th>
                <th>PATERNO</th>
                <th>MATERNO</th>
                <th>NOMBRES</th>
                <th>ACCIONES</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, Nro) of datosFiltrados" v-bind:key="data.ci">
              <!--  -->
                <td data-title="N°">{{ Nro + 1 }}</td>
                <td data-title="CI">{{ data.ci}}</td>
                <td data-title="PATERNO">{{ data.paterno }}</td>
                <td data-title="MATERNO">{{ data.materno }}</td>
                <td data-title="NOMBRES">{{ data.nombre }}</td>
                <td data-title="ACCIONES">
                  <div class="content-btn-attention">
                    <button class="btn-attention" v-on:click="verPaciente(data.ci)">
                      VER MÁS
                    </button>
                    <button class="btn-attention" v-on:click="atenderPaciente(data.id_persona)">
                      ATENDER
                    </button>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <div v-else class="alternative-div">
      <h2 >NO SE ENCONTRARON REGISTROS</h2>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';
import axios from 'axios';
import { useUsuarioStore } from '@/store/usuario.js';
/* import router from '@/router'; */
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()

let usuarioStore = useUsuarioStore();
let usuario = computed(() => usuarioStore.usuario)

let datos = ref([]);
let datosOriginales = ref([])
let ciBuscado = ref("");
let registros=ref(0)

const atenderPaciente = async(id_persona) =>{
  try {
    const resultado = await axios.post('http://localhost:3000/api/v1/attention/create',{
      id_usuario:usuario.value.id_usuario,
      id_persona,
      id_establecimiento:usuario.value.id_establecimiento
    });
    console.log(resultado);
    console.log("id: ", usuario.value.id_usuario,
      id_persona,
      usuario.value.id_establecimiento)
    /* router.push({name: 'inicio'}) */
  } catch (error) {
    if(error.status == 409){
      Swal.fire({
        icon: "error",
        title: "Paciente ya atendido",
        text: `${error.response.data.message}`,
      });
      /* console.log(error) */
    }
    else{
      console.log("my error en table attention", error)
    }

  }

}

const verPaciente = (id_persona) =>{
  router.push({name: 'datos-paciente', params: {id: id_persona}})
}

const datosFiltrados = computed(() => {
  const ci = ciBuscado.value.trim();
  return ci === ""
    ? datos.value
    : datosOriginales.value.filter(data => data.ci.toString().includes(ci));
});


onMounted(async()=>{
  try {
    const resultado = await axios.get('http://localhost:3000/api/v1/patient/show');
      registros.value = resultado.data.resultado.length;
    console.log("myres", resultado.data.resultado);
    datos.value=resultado.data.resultado
    datosOriginales.value = [...resultado.data.resultado];
  } catch (error) {

    console.log("Error al obtener los datos:", error)
  }

})

</script>

<style scoped>

.container-tableattention {
  color: black;
  /* border: 3px solid green; */
  padding-left: 3px;
  transition: width 0.3s ease;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.alternative-div{
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.header-tableattention {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  padding: 10px;
}

.search-tableattention {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  width: 100%;
}

.input-tableattention {
  display: flex;
  position: relative;
  align-items: center;
}

.icon-tableattention {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5px;
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

.btn-search, .input-text-search {
  font-size: 1.3em;
  height: 35px;
}

.date-tableattention {
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
