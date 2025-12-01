<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <button class="btn-add-item" v-on:click="createEstablishment">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-medical-cross icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z" /></svg>
          Agregar Establecimiento
        </button>
        <select v-model="statusSelect" >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
        <section class="input-table">
          <input
            type="text"
            placeholder="Establecimiento de salud"
            class="input-text-search"
            v-model="searchName"
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
            <th>ESTABLECIMIENTO</th>
            <th>TIPO</th>
            <th>MICRORED</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="ESTABLECIMIENTO">{{ item.nombre_establecimiento}}</td>
            <td data-title="TIPO">{{ item.tipo_establecimiento }}</td>
            <td data-title="MICRORED">{{ item.nombre_microred }}</td>
            <td data-title="ACCIONES">
              <div v-if="parseInt(statusSelect, 10)" class="content-btn-actions">
                <button class="btn-actions btn-view" v-on:click="viewEstablishment(item)">
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
                <button class="btn-actions btn-edit" v-on:click="editEstablishment(item.id)">
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
                <button class="btn-actions btn-delete" v-on:click="deleteEstablishment(item.id)">
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
                <button  class="btn-actions btn-delete" v-on:click="reactivateEstablishment(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-recycle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17l-2 2l2 2" /><path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1" /><path d="M8.536 11l-.732 -2.732l-2.732 .732" /><path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024" /><path d="M15.464 11l2.732 .732l.732 -2.732" /><path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ViewEstablishment
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
      :establishment="establishmentProp"
    />
    <FormEstablishment
      class="content-form"
      v-if="modalVisibleAdd"
      @modifyModalAdd="hideModalAdd"
    />
    <EditEstablishment
      class="content-edit"
      v-if="modalVisibleEdit"
      @modifyModalEdit="hideModalEdit"
      :id="idProp"
    />
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { establishmentService } from '@/services/Establecimiento.js'
import FormEstablishment from '@/components/Establishment/FormEstablishment.vue'
import EditEstablishment from '@/components/Establishment/EditEstablishment.vue'
import ViewEstablishment from '@/components/Establishment/ViewEstablishment.vue'
import { computed, onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'

let data = ref([])
let originalData = ref([])
let searchName = ref('')

let modalVisibleAdd = ref(false)
let modalVisibleEdit = ref(false)
let modalVisibleView = ref(false)

let idProp=ref("");
let establishmentProp=ref("");
let result = ref({})
let resultDelete=ref([]);
let resultReactivate=ref([]);
let statusSelect=ref(1);

const filterData = computed(() => {
  const health_center = searchName.value.trim()
  const result= health_center === ''
    ? data.value
    : originalData.value.filter((item) =>
        item.nombre_establecimiento.toString().toUpperCase().includes(health_center.toUpperCase()),
      )
  return result;
})

watch(statusSelect, (newValue) => {
  console.log("Estado cambiado a:", newValue)
  showEstablishment(parseInt(newValue, 10))
})

const showEstablishment = async (status) => {
  try {
    result.value = await establishmentService.showEstablishment(status)
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de establecimiento:', error)
  }
}

onMounted(async () => {
  showEstablishment(statusSelect.value)
})

/* boton de ver cs*/
const viewEstablishment=(item)=>{
  establishmentProp.value=item;
  console.log("establishment prop: ", establishmentProp.value)
  modalVisibleView.value=true;
}
/* ocultar vista cs */
const hideModalView = (valor) =>{
  modalVisibleView.value=valor;
  showEstablishment(statusSelect.value);
}
/* boton de agregar nuevo cs */
const createEstablishment = () => {
  modalVisibleAdd.value = true;
}
/* ocultar  modal de agregar cs*/
const hideModalAdd = (valor) => {
  modalVisibleAdd.value = valor
  showEstablishment(statusSelect.value)
}
/* boton de editar cs */
const editEstablishment = (id) => {
  idProp.value=id;
  modalVisibleEdit.value = true
}
/* ocultar modal de editar cs */
const hideModalEdit = (valor) => {
  modalVisibleEdit.value = valor
  showEstablishment(statusSelect.value);
}
/* boton eliminar cs */
const deleteEstablishment = async(id) => {
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará el establecimiento",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      resultDelete.value = await establishmentService.deleteEstablishment(id);
      if(resultDelete.value.ok){
        showEstablishment(statusSelect.value);
        Swal.fire({
          title: "¡Eliminado!",
          text: resultDelete.value.messsage,
          icon: "success"
        });
      }
      else{
        Swal.fire({
          title: "¡Error!",
          text: "Algo anda mal",
          icon: "error"
        });
      }
    } catch (error) {
      console.log("Error en eliminar establecimiento", error);
    }
  }
}

const reactivateEstablishment=async(id)=>{
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se reactivará el establecimiento",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      resultReactivate.value = await establishmentService.reactivateEstablishment(id);
      if(resultReactivate.value.ok){
        showEstablishment(statusSelect.value);
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
      console.log("Error al reactivar establecimiento", error)
    }
  }
}
</script>

<style scoped>
</style>
