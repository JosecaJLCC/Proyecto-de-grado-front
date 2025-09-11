<template>
  <div v-if="true" class="container-tableattention" >
    <div class="header-tableattention">
      <section class="search-tableattention">
        <h2 class="fecha-header">FECHA: {{ date }}</h2>
        <section class="input-tableattention">

          <input type="text" placeholder="INGRESE SU CI" class="input-text-search" v-model="searchCi">
          <CIcon :icon="cilSearch" class="icon-tableattention"/>
        </section>

      </section>
    </div>
    <table class="table-attention">
      <thead>
          <tr>
              <th>N°</th>
              <th>CI</th>
              <th>NOMBRES</th>
              <!-- <th>ESTABLECIMIENTO</th> -->
              <th>ACCIONES</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id_paciente">
            <!--  -->
              <td data-title="N°">{{ Nro + 1 }}</td>
              <td data-title="CI">{{ item.ci}}</td>
              <td data-title="NOMBRES">{{ item.nombres }}</td>
              <!-- <td data-title="ESTABLECIMIENTO">{{ data.establecimiento }}</td> -->
              <!-- <td data-title="ACCIONES">
                <div class="content-btn-attention">
                    <router-link  :to="{ name: 'datos-paciente', params: { id: item.ci } }">
                      VER MÁS
                    </router-link>
                </div>
              </td> -->
          </tr>
      </tbody>
  </table>
  </div>
  <div v-else class="alternative-div">
    <h2 >NO SE ENCONTRARON REGISTROS EN FECHA {{ date }}</h2>
  </div >
</template>

<script setup>
import '@/assets/styles/table.css';
import { computed, onMounted, ref } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import { cilSearch } from '@coreui/icons';
import axios from 'axios';
import { attentionService } from '@/services/Atencion.js';
/* import { useUsuarioStore } from '@/store/usuario.js';

let usuarioStore = useUsuarioStore();
let usuario = usuarioStore.usuario; */
let date = new Date();
date = date.toISOString().split("T")[0];

let data = ref([]);
let originalData = ref([])
let searchCi = ref("");
let result = ref([])

const filterData = computed(() => {
  const ci = searchCi.value.trim();
  const result = ci === ""
    ? data.value
    : originalData.value.filter(item =>
      item.ci.toString().includes(ci)
    );
  return result;
});

/* verPaciente = () => {

}
 */
onMounted(async () => {
  try {
    const res = await attentionService.showAttention();
    console.log("my res", res);
    data.value = Array.isArray(res) ? res : [res]; // 🔹 convertir a array si es objeto
    originalData.value = [...data.value];
  } catch (error) {
    console.log('Error al obtener los datos de atención:', error);
  }
});

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

.fecha-header{
  background-color: rgb(0, 128, 128);
  color: white;
  padding: 5px;
  border-radius: 20px;
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

</style>
