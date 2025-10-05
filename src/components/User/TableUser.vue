<template>
  <div class="container-table">
    <div class="header-table">
      <section class="search-table">
        <button class="btn-add-item" v-on:click="createPatient">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-plus icon-sidebar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
          Agregar Usuario
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
            <th>PERFIL</th>
            <th>NOMBRES</th>
            <th>CORREO</th>
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
            <td data-title="CORREO">{{ item.correo }}</td>
            <td data-title="ACCIONES">
              <div class="content-btn-actions">
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
                <button class="btn-actions btn-edit" v-on:click="editUser(item.id_usuario)">
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
                <button class="btn-actions btn-delete" v-on:click="deleteUser(item.id_usuario)">
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

    <ViewUser
      class="content-view"
      v-if="modalVisibleView"
      @modifyModalView="hideModalView"
    />

    <FormUser
      class="content-form"
      v-if="modalVisibleAdd"
      @modifyModalAdd="hideModalAdd"
    />
    <EditUser
      class="content-edit"
      v-if="modalVisibleEdit"
      @modifyModalEdit="hideModalEdit"
      :id_usuario="idProp"
    />
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import { userService } from '@/services/Usuario.js'
import FormUser from '@/components/User/FormUser.vue'
import EditUser from '@/components/User/EditUser.vue'
import ViewUser from '@/components/User/ViewUser.vue'
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'


let data = ref([])
let originalData = ref([])
let searchCi = ref('')

let modalVisibleView=ref(false)
let modalVisibleAdd = ref(false)
let modalVisibleEdit = ref(false)

let userProp=ref("");
let idProp=ref("");
let result = ref({})
let resultDelete=ref({})

const filterData = computed(() => {
  const health_center = searchCi.value.trim()
  const result= health_center === ''
    ? data.value
    : originalData.value.filter((item) =>
        item.ci.toString().toUpperCase().includes(health_center.toUpperCase()),
      )
  return result;
})

const showUser = async () => {
  try {
    result.value = await userService.showUser()
    console.log('mi result show user', result.value)
    // Asignar aunque esté vacío
    data.value = Array.isArray(result.value) ? result.value : [result.value]
    originalData.value = [...data.value]
  } catch (error) {
    console.log('Error al obtener los datos de usuario:', error)
  }
}

onMounted(async () => {
  showUser()
})

const viewUser = (item) =>{
  userProp.value=item;
  console.log("staff prop: ", userProp.value)
  modalVisibleView=true;
}
/* boton de agregar nuevo cs */
const createPatient = () => {
  modalVisibleAdd.value = true
}

const hideModalAdd = (valor) => {
  modalVisibleAdd.value = valor
  showUser()
}
/* boton de editar cs */
const editUser = (id_usuario) => {
  console.log("edit", id_usuario)
  idProp.value=id_usuario;
  modalVisibleEdit.value = true
}

const hideModalEdit = (valor) => {
  modalVisibleEdit.value = valor
  showUser();
}

/* boton eliminar cs */
const deleteUser = async(id_usuario) => {
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
      console.log('mi id:', id_usuario)
      resultDelete.value = await userService.deleteUser(id_usuario);
      console.log("eliminado",resultDelete.value)
      showUser();
      Swal.fire({
        title: "¡Eliminado!",
        text: "Usuario eliminado.",
        icon: "success"
      });
    } catch (error) {
      console.log("Error en eliminar microred")
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

.container-table {
  color: var(--color-black);
  padding-left: 3px;
  transition: width 0.8s ease;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
     /*  background-color: var(--color-white-transparent);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px); */
}
.content-table {
  width: 100%;
  position: relative;
  /* min-height: 100vh; */
}

.content-form,
.content-edit,
.content-view {
  position: absolute; /* o fixed, si prefieres */
  top: 0px;
  left: 0;
  width: 100%;
  min-height: 85dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  background-color: var(--color-black-transparent); /* blanco semitransparente */
  backdrop-filter: blur(5px); /* 🔥 Aquí se hace el desenfoque */
  -webkit-backdrop-filter: blur(5px); /* compatibilidad con Safari */
  z-index: 10;
}

.alternative-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85dvh;
  width: 100%;
  color: var(--color-black);
}

.header-table {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  padding: 10px;
}

.search-table {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
  flex-wrap: wrap;
}

.input-table {
  display: flex;
  position: relative;
  align-items: center;
}

.icon-table-microred {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5px;
}

.input-text-search {
  padding-left: 25px;
  border-radius: 20px;
}

.btn-add-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 5px 10px;
}

.btn-add-item:hover {
  background-color: var(--color-secondary);
}

.btn-search {
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 150px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-weight: bold;
}

.btn-search,
.input-text-search,
.btn-add-item {
  font-size: 1.3em;
  height: 35px;
}

.date-table-microred {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 5px;
  border-radius: 20px;
}

/* .btn-attention {
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 100px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-weight: bold;
} */

.btn-actions {
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 50%;
  outline: none;
  border: none;
}

.btn-attention{
  background-color: aqua;
}

.btn-view {
  background-color: var(--color-primary);
}

.btn-edit {
  background-color: rgb(229, 229, 25);
}

.btn-delete {
  background-color: var(--color-secondary);
}
</style>
