<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <section class="input-table">
          <input
            type="text"
            placeholder="Ingrese su CI"
            class="input-text-search"
            v-model="searchCi"
            pattern="^[A-Za-z0-9 ]+$"
            title="Solo se permiten letras y números"/>
           <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search icon-table"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        </section>
      </section>
    </div>
    <div class="table-wrapper">
      <table class="content-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>FECHA</th>
            <th>CI</th>
            <th>TABLA</th>
            <th>ID</th>
            <th>ACCIÓN</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="FECHA">{{ item.fecha_log }}</td>
            <td data-title="CI">{{ item.ci}}</td>
            <td data-title="TABLA">{{ item.tabla }}</td>
            <td data-title="ID">{{ item.tabla_id }}</td>
            <td data-title="ACCIÓN">{{ item.accion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
<!--     <ViewUser
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
      :user="userProp"
    /> -->

  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { userService } from '@/services/Usuario.js'
import ViewUser from '@/components/User/ViewUser.vue'
import { computed, onMounted, ref,watch } from 'vue'
import Swal from 'sweetalert2'

let apiBaseUrl= ref(import.meta.env.VITE_API_URL || 'http://192.168.0.14:3000')

let data = ref([])
let originalData = ref([])
let searchCi = ref('')

let userProp=ref("");
let result = ref({})


const filterData = computed(() => {
  const ciUser = searchCi.value.trim()
  const result= ciUser === ''
    ? data.value
    : originalData.value.filter((item) =>
        item.ci.toString().toUpperCase().includes(ciUser.toUpperCase()),
      )
  return result;
})

const showActivityUser = async () => {
  try {
    result.value = await userService.logsShow()
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de usuario:', error)
  }
}

onMounted(async () => {
  showActivityUser()
})
/* boton de ver usuario*/
const viewUser = (item) =>{
  userProp.value=item;
  modalVisibleView.value=true;
}
/* ocultar vista usuario*/
const hideModalView = (valor) =>{
  modalVisibleView.value=valor;
  showActivityUser(statusSelect.value);
}

</script>

<style scoped>
.img-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
