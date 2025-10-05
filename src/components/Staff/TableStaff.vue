<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <button class="btn-add-item" v-on:click="createEstablishment">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
          Agregar Personal
        </button>
        <section class="input-table">
          <input
            type="text"
            placeholder="Ingrese su CI"
            class="input-text-search"
            v-model="searchCi"
          />
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search icon-table"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
        </section>
      </section>
    </div>
    <div class="content-table">
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>CI</th>
            <th>NOMBRES</th>
            <th>AREA</th>
            <th>CARGO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id_personal">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="CI">{{ item.ci}}</td>
            <td data-title="NOMBRES">{{ item.nombres }}</td>
            <td data-title="AREA">{{ item.nombre_area }}</td>
            <td data-title="CARGO">{{ item.cargo }}</td>
            <td data-title="ACCIONES">
              <div class="content-btn-actions">
                <button class="btn-actions btn-view" v-on:click="verHospital">
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
                <button class="btn-actions btn-edit" v-on:click="editStaff(item.id_personal)">
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
                <button class="btn-actions btn-delete" v-on:click="deleteStaff(item.id_personal)"
                >
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ViewStaff
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
    />
    <FormStaff
      class="content-form"
      v-if="modalVisibleAdd"
      @modifyModalAdd="hideModalAdd"
    />
    <EditStaff
      class="content-edit"
      v-if="modalVisibleEdit"
      @modifyModalEdit="hideModalEdit"
      :id_personal="idProp"
    />
  </div>
</template>

<script setup>
import '@/assets/styles/table.css';
import '@/assets/styles/tableComponent.css';
import FormStaff from '@/components/Staff/FormStaff.vue';
import EditStaff from '@/components/Staff/EditStaff.vue';
import ViewStaff from '@/components/Staff/ViewStaff.vue';
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import { staffService } from '@/services/Personal.js'

let data = ref([])
let originalData = ref([])
let searchCi = ref('')

let modalVisibleView=ref(false)
let modalVisibleAdd = ref(false)
let modalVisibleEdit = ref(false)

let staffProp=ref("");
let idProp=ref("");
let result = ref({})
let resultDelete=ref([]);

const filterData = computed(() => {
  const ci = searchCi.value.trim()
  const result= ci === ''
    ? data.value
    : originalData.value.filter((item) =>
        item.ci.toString().toUpperCase().includes(ci.toUpperCase()),
      )
  return result;
})

const showStaff = async () => {
  try {
    result.value = await staffService.showStaff()
    console.log('mi result show staff', result.value)
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos del personal ', error)
  }
}

onMounted(async () => {
  showStaff()
})
const viewStaff = (item) =>{
  staffProp.value=item;
  console.log("staff prop: ", staffProp.value)
  modalVisibleView=true;
}

/* boton de agregar nuevo cs */
const createEstablishment = () => {
  modalVisibleAdd.value = true
}

const hideModalAdd = (valor) => {
  modalVisibleAdd.value = valor
  showStaff()
}
/* boton de editar cs */
const editStaff = (id_personal) => {
  console.log("edit id", id_personal)
  idProp.value=id_personal;
  modalVisibleEdit.value = true
}

const hideModalEdit = (valor) => {
  modalVisibleEdit.value = valor
  showStaff();
}

/* boton eliminar cs */
const deleteStaff = async(id_personal) => {
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará el personal",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      console.log('mi id:', id_personal)
      resultDelete.value = await staffService.deleteStaff(id_personal);
      console.log("eliminado",resultDelete.value)
      showStaff();
      Swal.fire({
        title: "¡Eliminado!",
        text: "Personal eliminado",
        icon: "success"
      });
    } catch (error) {
      console.log("Error en eliminar microred")
    }
  }
}
</script>

<style scoped>
</style>
