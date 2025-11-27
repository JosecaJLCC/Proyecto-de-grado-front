<template>
  <div class="container-form-modal" id="medical-description-pdf">
    <form @submit.prevent="createMedicalDescription" class="content-form-modal">
      <fieldset class="fieldset-form-modal">
        <legend class="legend-form-modal">
          <span class="title-form-modal">RECETARIO</span>
        </legend>
        <section class="diagnostic-attention-modal">
          <div class="content-modal">
            <div class="row-container">
              <div class="column">
                <span>ESTABLECIMIENTO: <strong>{{ attention.nombre_establecimiento }}</strong></span>
                <span>PACIENTE: <strong>{{ attention.nombres }}</strong></span>
                <span>DOMICILIO: <strong>{{ attention.domicilio }}</strong></span>
              </div>

              <div class="column">
                <span>FECHA DE NACIMIENTO: <strong>{{ attention.fecha_nacimiento.split(' ')[0] }}</strong></span>
                <span>SEXO: <strong>{{ attention.sexo }}</strong></span>
                <span>TURNO: <strong>{{ attention.turno }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Inputs abajo ocupando todo el ancho -->
          <div class="inputs-full-width">
            <input
              placeholder=" Diagnóstico"
              type="text"
              list="diagnostico"
              v-model="diagnostico.nombre_diagnostico"
            />
            <datalist id="diagnostico">
              <option
                :value="item.nombre_diagnostico"
                v-for="item in resultDiagnosis"
                :key="item.id">
                {{ item.nombre_diagnostico }}
              </option>
            </datalist>
            <textarea placeholder=" Descripción del diagnóstico"></textarea>
          </div>
        </section>
        <div class="table-wrapper">
          <table class="content-table">
            <thead>
              <tr>
                <th>MEDICAMENTO</th>
                <th>INDICACIÓN</th>
                <th>RECETADA</th>
                <th>DISPENSADA</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, nro) of receta" v-bind:key="item">
                <td data-title="MEDICAMENTO">
                  <input
                    placeholder="Medicamento"
                    type="text"
                    list="medicamento"
                    v-model="receta[nro].nombre_medicamento"
                  />
                  <datalist id="medicamento">
                    <option :value="item.nombre_medicamento" v-for="item in resultMedication" :key="item.id">
                      {{ item.nombre_medicamento }}
                    </option>
                  </datalist>
                </td>
                <td data-title="INDICACIÓN">
                  <input type="text" placeholder="Indicaciones" v-model="receta[nro].indicacion" />
                </td>
                <td data-title="C. RECETADA">
                  <input
                    type="number"
                    placeholder="Cantidad recetada"
                    v-model="receta[nro].recetada"
                  />
                </td>
                <td data-title="C. DISPENSADA">
                  <input
                    type="number"
                    placeholder="Cantidad dispensada"
                    v-model="receta[nro].dispensada"
                  />
                </td>
                <td data-title="ACCIONES">
                  <button class="btn-actions btn-delete" v-on:click="deleteMedication(item.id)">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </fieldset>
      <div class="actions-form-modal">
        <button class="form-btn btn-cancel" type="button" v-on:click="sendValueModal">
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
          CANCELAR
        </button>
        <button class="form-btn btn-attention" type="button" v-on:click="addMedication">
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
            <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
            <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
            <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
            <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
            <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
            <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
            <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
          MEDICAMENTO
        </button>
        <button class="form-btn btn-accept" type="submit">
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
          ACEPTAR
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
/* import html2pdf from 'html2pdf.js' */
import '@/assets/styles/modalForm.css'
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { attentionService } from '@/services/Atencion'
import { onMounted, reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'

import { useUsuarioStore } from '@/store/usuario.js'
let authStore = useUsuarioStore()
let usuario = computed(() => authStore.usuario)

let props = defineProps({
  attention: {
    type: Object,
    required: true,
  },
})
let diagnostico = reactive({
  nombre_diagnostico: '',
  descripcion: '',
  id_usuario_rol_diagnostico: usuario.value.id,
})
let estado_atencion = 'EN ATENCIÓN'
let receta = reactive([])

let resultDiagnosis = ref([])
let resultMedication = ref([])
let result = ref([])

onMounted(async () => {
  try {
    resultDiagnosis.value = await attentionService.showDiagnosis()
    resultMedication.value = await attentionService.showMedication()
    console.log("diagnostico: " ,resultDiagnosis.value)
    console.log("medicacion: ",resultDiagnosis.value)
  } catch (error) {
    console.log('error en el diagnostico: ', error)
  }
})

let addMedication = () => {
  receta.push({
    nombre_medicamento: '',
    indicacion: '',
    recetada: 0,
    dispensada: 0,
  })
  return
}

let deleteMedication = () => {
  receta.pop()
}

const emits = defineEmits(['modifyModalAttention'])
const sendValueModal = () => {
  emits('modifyModalAttention', false)
}

const createMedicalDescription = async () => {
  console.log('mi receta y diagnostico:', receta, diagnostico)
  if (!diagnostico.nombre_diagnostico) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: `Por favor complete todos los campos`,
    })
    return
  }
  try {
    result.value = await attentionService.createMedicalDescription(props.attention.id, {
      diagnostico,
      receta,
      estado_atencion,
    })
    console.log('ok: ', result.value)
    if (result.value.ok) {
      Swal.fire({
        title: '¡Registro Exitoso!',
        text: 'Tus datos fueron registrados',
        icon: 'success',
      })
    }
    sendValueModal()

  } catch (error) {
    console.log('Error en crear la receta y diagnostico', error)
  }
}
console.log('mis props de atencion: ', props.attention)
</script>

<style scoped>
th {
  font-size: 15px;
}

input, datalist, textarea {
  padding-left: 5px;
  border-radius: 20px;
  outline: none;
  border: 2px solid var(--color-primary);
  height: 25px;
  font-weight: bold;
}

.diagnostic-attention-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--color-black)
}

.row-container {
  display: flex;
  gap: 40px; /* Espacio entre columnas */
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacio entre items */
  flex: 1; /* Ambas columnas ocupan igual ancho */
}

.inputs-full-width {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* .inputs-full-width input,
.inputs-full-width textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
} */

.inputs-full-width textarea {
  min-height: 80px;
  resize: vertical;
}
/* Para móviles */
@media (max-width: 768px) {
  .row-container {
    flex-direction: column;
    gap: 20px;
  }

  .column {
    width: 100%;
  }
}
/* .table-wrapper {
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
  }

.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 128, 128, 0.7);
  border-radius: 10px;
} */
</style>
