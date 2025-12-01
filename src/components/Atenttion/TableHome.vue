<template>
  <div class="container-table" >
    <div class="header-table">
      <section class="search-table">
        <h2 class="btn-add-item">FECHA: {{ date }}</h2>
        <section class="input-table">
          <input type="text"
            placeholder="Ingrese el CI"
            class="input-text-search"
            v-model="searchCi"
            pattern="^[A-Za-z0-9 ]+$"
            title="Solo se permiten letras y números">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-search icon-table"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </section>
      </section>
    </div>
    <div class="table-wrapper">
      <table class="content-table">
        <thead>
            <tr>
                <th>N°</th>
                <th>CI</th>
                <th>NOMBRES</th>
                <th>ESTABLECIMIENTO</th>
                <th>ÁREA</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, Nro) in filterData" v-bind:key="item.id">
              <!--  -->
                <td data-title="N°">{{ Nro + 1 }}</td>
                <td data-title="CI">{{ item.ci}}</td>
                <td data-title="NOMBRES">{{ item.nombres }}</td>
                <td data-title="ESTABLECIMIENTO">{{ item.nombre_establecimiento }}</td>
                <td data-title="ÁREA">{{ item.nombre_area }}</td>
                <td
                  :style="{backgroundColor:'var(--color-yellow)'}"
                  data-title="ESTADO"
                  v-if="item.estado_atencion=='EN ESPERA'">
                  {{ item.estado_atencion }}
                </td>
                <td
                  :style="{backgroundColor:'var(--color-blue)'}"
                  data-title="ESTADO"
                  v-else-if="item.estado_atencion=='EN ATENCIÓN'">
                  {{ item.estado_atencion }}
                </td>
                <td
                  :style="{backgroundColor:'var(--color-primary)'}"
                  data-title="ESTADO"
                  v-else-if="item.estado_atencion=='FINALIZADA'">
                  {{ item.estado_atencion }}
                </td>
                <td
                  :style="{backgroundColor:'var(--color-secondary)'}"
                  data-title="ESTADO"
                  v-else-if="item.estado_atencion=='INCOMPLETA'">
                  {{ item.estado_atencion }}
                </td>
                <td data-title="ACCIONES">
                  <div class="content-btn-actions">
                    <button class="btn-actions btn-view" v-on:click="viewAttention(item)">
                      <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path
                      d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
                    />
                  </svg>
                    </button>
                  </div>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
    <DiagnosticAttention
      class="content-view"
      v-if="modalVisibleAttention"
      @modifyModalAttention="hideModalAttention"
      :attention="attentionProp"
    />
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { attentionService } from '@/services/Atencion.js';
import DiagnosticAttention from './DiagnosticAttention.vue';

let date = new Date();
date = date.toISOString().split("T")[0];

let data = ref([]);
let originalData = ref([])
let searchCi = ref("");

let modalVisibleAttention=ref(false);
let attentionProp=ref("");
let result = ref({})
let resultTurn=ref({})

const filterData = computed(() => {
  const ci = searchCi.value.trim();
  const result = ci === ""
    ? data.value
    : originalData.value.filter(item =>
      item.ci.toString().includes(ci)
    );
  return result;
});

const showAttention = async () => {
  try {
    result.value = await attentionService.showAttention()
    console.log('mi result show attention', result.value)
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de microred:', error)
  }
}

const showTurn = async () => {
  try {
    resultTurn.value = await attentionService.showTurn();
    console.log("mi result de turno: ",resultTurn)
  } catch (error) {
    console.log('Error al verificar turno:', error)
  }
}

// ✅ POLLING (cada 5 segundos)
let intervalId = null;

onMounted(async () => {
  await showAttention();
  await showTurn();
  intervalId = setInterval(() => {
    showTurn();
    showAttention();
  }, 5000);
});
// LIMPIAR INTERVALO AL SALIR DEL COMPONENTE
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

/* boton de ver atencion */
const viewAttention = (item) =>{
  attentionProp.value=item;
  console.log("item enviado: ", attentionProp.value)
  modalVisibleAttention.value=true;
}
/* ocultar vista de atencion */
const hideModalAttention = (valor) =>{
  modalVisibleAttention.value=valor;
  showAttention();
}

</script>

<style scoped>
.table-wrapper {
    /* border: 2px solid green; */
    /* max-height: 400px;   */ /* puedes cambiar a 500px si quieres */
    overflow-y: auto;
    overflow-x: hidden;
  }


/* Opcional: mejora visual del scroll */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 128, 128, 0.7);
  border-radius: 10px;
}
.date-header-table{
  background-color: rgb(0, 128, 128);

  color: white;
  padding: 5px;
  border-radius: 20px;
}

.td-status{
  color: rgb(0, 128, 128)
}
</style>
