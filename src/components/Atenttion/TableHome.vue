<template>
  <div class="container-table" >
    <div class="header-table">
      <section class="search-table">
        <h2 class="date-header-table">FECHA: {{ date }}</h2>
        <section class="input-table">
          <input type="text"
          placeholder="Ingrese el CI"
          class="input-text-search"
          v-model="searchCi">
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
    <table class="content-table">
      <thead>
          <tr>
              <th>N°</th>
              <th>CI</th>
              <th>NOMBRES</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id_paciente">
            <!--  -->
              <td data-title="N°">{{ Nro + 1 }}</td>
              <td data-title="CI">{{ item.ci}}</td>
              <td data-title="NOMBRES">{{ item.nombres }}</td>
              <td data-title="ESTADO">{{ item.nombres }}</td>
              <td data-title="ACCIONES">
                <div class="content-btn-actions">
                  <button class="btn-actions btn-patient" v-on:click="diagnosticPatient(item.id_paciente)">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M10 14h4" /><path d="M12 12v4" /></svg>
                  </button>
                </div>
              </td>
          </tr>
      </tbody>
    </table>
    </div>
</template>

<script setup>
import '@/assets/styles/table.css';
import '@/assets/styles/tableComponent.css'
import { computed, onMounted, ref } from 'vue';
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
.date-header-table{
  background-color: rgb(0, 128, 128);
  color: white;
  padding: 5px;
  border-radius: 20px;
}
</style>
