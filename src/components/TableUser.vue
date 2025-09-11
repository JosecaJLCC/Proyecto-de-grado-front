<template>
  <div v-if="registros > 0" class="container-tablehospital">
    <div class="content-tablehospital">
      <div class="header-tablehospital">
        <section class="search-tablehospital">
          <button class="btn-agregar-cs" v-on:click="agregarHospital">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <strong> Agregar Usuario</strong>
          </button>
          <section class="input-tablehospital">
            <input
              type="text"
              placeholder="CENTRO DE SALUD"
              class="input-text-search"
              v-model="nombreBuscado"
            />
            <CIcon :icon="cilSearch" class="icon-tablehospital" />
          </section>
        </section>
      </div>
      <table class="table-attention">
        <thead>
          <tr>
            <th>N°</th>
            <th>PERFIL</th>
            <th>CI</th>
            <th>NOMBRE</th>
            <th>ROL</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, Nro) of datosFiltrados" v-bind:key="data.id_establecimiento">
            <td data-title="N°">{{ Nro + 1 }}</td>
            <td data-title="PERFIL">{{ data.nombre_establecimiento }}</td>
            <td data-title="CI">{{ data.av_calle }}</td>
            <td data-title="NOMBRE">{{ data.zona }}</td>
            <td data-title="ACCIONES">{{ data.zona }}</td>
            <td data-title="ACCIONES">
              <div class="content-btn-attention">
                <router-link
                  :to="{ name: 'registrar-centro-salud', params: { id: id_establecimiento } }"
                >
                  VER MÁS
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormCentroSalud class="content-form-cs" v-if="modalVisible" @modificarModal="ocultarModal" />
  </div>
  <div v-else class="alternative-div">
    <h2>NO SE ENCONTRARON REGISTROS...</h2>
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import { usuarioService } from '@/services/Establecimiento.js'
import FormCentroSalud from './Microred/FormMicrored.vue'
import { computed, onMounted, ref } from 'vue'
import { CIcon } from '@coreui/icons-vue'
import { cilSearch } from '@coreui/icons'

let datos = ref([])
let datosOriginales = ref([])
let nombreBuscado = ref('')
let registros = ref(0)
let modalVisible = ref(false)

const datosFiltrados = computed(() => {
  const centro_salud = nombreBuscado.value.trim()
  return centro_salud === ''
    ? datos.value
    : datosOriginales.value.filter((data) =>
        data.nombre_establecimiento.toString().includes(centro_salud.toUpperCase()),
      )
})

const obtenerEstablecimientos = async () => {
  try {
    let resultado = await EstablecimientoService.obtenerEstablecimiento()
    datos.value = resultado.data.resultado
    registros.value = resultado.data.resultado.length
    datosOriginales.value = [...resultado.data.resultado]
  } catch (error) {
    console.log('Error al obtener los datos:', error)
  }
}

onMounted(async () => {
  obtenerEstablecimientos()
})

const agregarHospital = () => {
  modalVisible.value = true
}

const ocultarModal = (valor) => {
  modalVisible.value = valor
  obtenerEstablecimientos()
}
</script>

<style scoped>
.container-tablehospital {
  color: black;
  padding-left: 3px;
  transition: width 0.3s ease;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
}

.content-tablehospital {
  width: 100%;
  position: relative;
  /* min-height: 100vh; */
}

.content-form-cs {
  position: absolute; /* o fixed, si prefieres */
  top: 0px;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(255, 255, 255, 0.5); /* blanco semitransparente */
  backdrop-filter: blur(5px); /* 🔥 Aquí se hace el desenfoque */
  -webkit-backdrop-filter: blur(5px); /* compatibilidad con Safari */
  z-index: 10;
}

.alternative-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.header-tablehospital {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  padding: 10px;
}

.search-tablehospital {
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
  flex-wrap: wrap;
}

.input-tablehospital {
  display: flex;
  position: relative;
  align-items: center;
}

.icon-tablehospital {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5px;
}

.input-text-search {
  padding-left: 25px;
  border-radius: 20px;
}

.btn-agregar-cs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgb(0, 128, 128);
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 5px;
}

.btn-agregar-cs:hover {
  background-color: rgb(224, 63, 62);
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

.btn-search,
.input-text-search,
.btn-agregar-cs {
  font-size: 1.3em;
  height: 35px;
}

.date-tablehospital {
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

.btn-attention {
  background-color: rgb(0, 128, 128);
  color: white;
  width: 100px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-weight: bold;
}
</style>
