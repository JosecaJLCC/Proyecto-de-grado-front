<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <button class="btn-add-item" v-on:click="createUser">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
          Agregar Usuario
        </button>
        <select v-model="statusSelect" >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
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
            <th>PERFIL</th>
            <th>NOMBRES</th>
            <th>USUARIO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, Nro) in filterData" v-bind:key="item.id_paciente">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="CI">{{ item.ci}} {{ item.extension }}</td>
            <td data-title="CI">
              <img class="img-profile" :src="`http://localhost:3000/uploads/${item.perfil}`" alt="" />
            </td>
            <td data-title="NOMBRES">{{ item.paterno }} {{ item.materno }} {{ item.nombre }}</td>
            <td data-title="USUARIO">{{ item.nombre_usuario }}</td>
            <td data-title="ACCIONES">
              <div v-if="parseInt(statusSelect, 10)" class="content-btn-actions">
                <button class="btn-actions btn-view" v-on:click="viewUser(item)">
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
                <button class="btn-actions btn-edit" v-on:click="editUser(item.id)">
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
                <button class="btn-actions btn-delete" v-on:click="deleteUser(item.id)">
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
                <button  class="btn-actions btn-delete" v-on:click="reactivateUser(item.codigo)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-recycle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17l-2 2l2 2" /><path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1" /><path d="M8.536 11l-.732 -2.732l-2.732 .732" /><path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024" /><path d="M15.464 11l2.732 .732l.732 -2.732" /><path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormUser
      class="content-form"
      v-if="modalVisibleAdd"
      @modifyModalAdd="hideModalAdd"
    />
    <ViewUser
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
      :user="userProp"
    />
    <EditUser
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
import { userService } from '@/services/Usuario.js'
import FormUser from '@/components/User/FormUser.vue';
import EditUser from '@/components/User/EditUser.vue'
import ViewUser from '@/components/User/ViewUser.vue'
import { computed, onMounted, ref,watch } from 'vue'
import Swal from 'sweetalert2'

let data = ref([])
let originalData = ref([])
let searchCi = ref('')

let modalVisibleView=ref(false)
let modalVisibleAdd = ref(false)
let modalVisibleEdit = ref(false)

let idProp=ref("");
let userProp=ref("");
let result = ref({})
let resultDelete=ref({})
let resultReactivate=ref([]);
let statusSelect=ref(1);

const filterData = computed(() => {
  const ciUser = searchCi.value.trim()
  const result= ciUser === ''
    ? data.value
    : originalData.value.filter((item) =>
        item.ci.toString().toUpperCase().includes(ciUser.toUpperCase()),
      )
  return result;
})

watch(statusSelect, (newValue) => {
  console.log("Estado cambiado a:", newValue)
  showUser(parseInt(newValue, 10))
})

const showUser = async (status) => {
  try {
    result.value = await userService.showUser(status)
    console.log('mi result show user', result.value)
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de usuario:', error)
  }
}

onMounted(async () => {
  showUser(statusSelect.value)
})
/* boton de ver usuario*/
const viewUser = (item) =>{
  userProp.value=item;
  console.log("staff prop: ", userProp.value)
  modalVisibleView.value=true;
}
/* ocultar vista usuario*/
const hideModalView = (valor) =>{
  modalVisibleView.value=valor;
  showUser(statusSelect.value);
}
/* boton de busqueda de usuario por ci para su agregacion */
const createUser = () => {
  modalVisibleAdd.value = true
}
/* ocultar modal de busqueda de usuario*/
const hideModalAdd = (valor) => {
  modalVisibleAdd.value = valor
  showUser(statusSelect.value)
}
/* boton de editar usuario */
const editUser = (id) => {
  idProp.value=id;
  modalVisibleEdit.value = true
}
/* ocultar modal de editar usuario */
const hideModalEdit = (valor) => {
  modalVisibleEdit.value = valor
  showUser();
}
/* boton eliminar usuario */
const deleteUser = async(id) => {
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará al usuario",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
    cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      console.log('mi id:', id)
      resultDelete.value = await userService.deleteUser(id);
      console.log("eliminado",resultDelete.value)
      if(resultDelete.value.ok){
        showUser(statusSelect.value);
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
      console.log("Error en eliminar microred")
    }
  }
}

const reactivateUser=async(id)=>{
  const resultSwal = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Se reactivará al personal",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(5, 135, 137)",
        cancelButtonColor: "rgb(224, 63, 62)",
    confirmButtonText: "Aceptar"
  })
  if (resultSwal.isConfirmed) {
    try {
      resultReactivate.value = await userService.reactivateUser(id);
      if(resultReactivate.value.ok){
        showUser(statusSelect.value);
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
      console.log("Error al reactivar personal", error)
    }
  }
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
