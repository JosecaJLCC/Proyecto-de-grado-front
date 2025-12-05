<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <button class="btn-add-item" v-on:click="createMicrored">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-building-hospital icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /><path d="M10 9l4 0" /><path d="M12 7l0 4" /></svg>
          Agregar Microred
        </button>
        <select v-model="statusSelect" >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
        <section class="input-table">
          <input
            type="text"
            placeholder="Nombre de la microred"
            class="input-text-search"
            v-model="searchName"
          />
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search icon-table"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        </section>
      </section>
    </div>
    <div class="table-wrapper">
      <table class="content-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>CODIGO</th>
            <th>MICRORED</th>
            <th>RED</th>
            <th>DIRECTOR</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, Nro) of filterData" v-bind:key="item.codigo">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="CODIGO">{{ item.codigo}}</td>
            <td data-title="MICRORED">{{ item.nombre_microred }}</td>
            <td data-title="RED">{{ item.red }}</td>
            <td data-title="DIRECTOR">{{ item.nombres }}</td>
            <td data-title="ACCIONES">
              <div v-if="parseInt(statusSelect, 10)" class="content-btn-actions">
                <button class="btn-actions btn-view" v-on:click="viewMicrored(item)">
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
                <button class="btn-actions btn-edit" v-on:click="editMicrored(item.codigo)">
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                  </svg>
                </button>
                <button class="btn-actions btn-delete" v-on:click="deleteMicrored(item.codigo)">
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
              <div v-else class="content-btn-actions">
                <button  class="btn-actions btn-delete" v-on:click="reactivateMicrored(item.codigo)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-recycle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17l-2 2l2 2" /><path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1" /><path d="M8.536 11l-.732 -2.732l-2.732 .732" /><path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024" /><path d="M15.464 11l2.732 .732l.732 -2.732" /><path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ViewMicrored
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
      :microred="microredProp"
    />
    <FormMicrored
      class="content-form"
      v-if="modalVisibleAdd"
      @modifyModalAdd="hideModalAdd"
    />
    <EditMicrored
      class="content-edit"
      v-if="modalVisibleEdit"
      @modifyModalEdit="hideModalEdit"
      :codigo="idProp"
    />
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { microredService } from '@/services/Microred.js'
import FormMicrored from '@/components/Microred/FormMicrored.vue'
import EditMicrored from '@/components/Microred/EditMicrored.vue'
import ViewMicrored from '@/components/Microred/ViewMicrored.vue'
import { computed, onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'

let data = ref([])
let originalData = ref([])
let searchName = ref('')

let modalVisibleView = ref(false)
let modalVisibleAdd = ref(false)
let modalVisibleEdit = ref(false)

let idProp=ref("");
let microredProp=ref("");
let result = ref({});
let resultDelete = ref([]);
let resultReactivate=ref([]);
let statusSelect=ref(1);

const filterData = computed(() => {
  const microred = searchName.value.trim()
  const result= microred === ''
    ? data.value
    : originalData.value.filter(item =>
        item.nombre_microred.toString().toUpperCase().includes(microred.toUpperCase()),
      )
    return result;
})

watch(statusSelect, (newValue) => {
  console.log("Estado cambiado a:", newValue)
  showMicrored(parseInt(newValue, 10))
})

const showMicrored = async (status) => {
  try {
    result.value = await microredService.showMicrored(status)
    
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de microred:', error)
  }
}

onMounted(async () => {
  showMicrored(statusSelect.value)
})
/* boton de ver microred */
const viewMicrored = (item) =>{
  microredProp.value=item;
  console.log("item enviado: ", microredProp.value)
  modalVisibleView.value=true;
}
/* ocultar vista microred */
const hideModalView = (valor) =>{
  modalVisibleView.value=valor;
  showMicrored(statusSelect.value);
}
/* boton de agregar microred */
const createMicrored = () => {
  modalVisibleAdd.value = true;
}
/* ocultar modal de agregar microred*/
const hideModalAdd = (valor) => {
  modalVisibleAdd.value = valor;
  showMicrored(statusSelect.value);
}
/* boton de editar microred */
const editMicrored = (codigo) => {
  idProp.value=codigo;
  modalVisibleEdit.value = true
}
/* ocultar modal de editar microred */
const hideModalEdit = (valor) => {
  modalVisibleEdit.value = valor
  showMicrored(statusSelect.value);
}
/* boton eliminar microred */
const deleteMicrored = async(codigo) => {
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará la microred",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      resultDelete.value = await microredService.deleteMicrored(codigo);
      if(resultDelete.value.ok){
        showMicrored(statusSelect.value);
        Swal.fire({
          title: "¡Eliminado!",
          text: resultDelete.value.message,
          icon: "success"
        });
      }
      else{
        Swal.fire({
          title: "¡Error!",
          text: 'Algo anda mal',
          icon: "error"
        });
      }
    } catch (error) {
      console.log("Error en eliminar microred", error)
    }
  }
}

const reactivateMicrored=async(codigo)=>{
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se reactivará la microred",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      resultReactivate.value = await microredService.reactivateMicrored(codigo);
      if(resultReactivate.value.ok){
        showMicrored(statusSelect.value);
        Swal.fire({
          title: "¡Reactivado!",
          text: resultReactivate.value.message,
          icon: "success"
        });
      }
      else{
        Swal.fire({
          title: "¡Error!",
          text: 'Algo anda mal',
          icon: "error"
        });
      }
    } catch (error) {
      console.log("Error al reactivar microred", error)
    }
  }
}
</script>

<style scoped>
</style>
