<template>
  <div class="container-form-modal">
    <form @submit.prevent="createMedicalDescription" class="content-form-modal">
      <fieldset class="fieldset-form-modal" ref="pdfContent">
        <div class="img-logos">
          <img src="../../assets/escudo.png" alt="" width="70px" height="70px">
          <span class="title-form-modal">DESCRIPCIÓN MÉDICA</span>
          <img src="../../assets/CapacabanaLogo.png" alt="" width="50px" height="50px">
        </div>
        <section class="register-form-modal">
          <div class="row-description-modal">
            <div class="column-description-modal">
              <span>ESTABLECIMIENTO: <strong>{{ props.attention.nombre_establecimiento }}</strong></span>
              <span>PACIENTE: <strong>{{ props.attention.nombres }}</strong></span>
              <span>DOMICILIO: <strong>{{ props.attention.domicilio }}</strong></span>
            </div>
            <div class="column-description-modal">
              <span>FECHA DE NACIMIENTO: <strong>{{ props.attention.fecha_nacimiento.split(' ')[0] }}</strong></span>
              <span>SEXO: <strong>{{ props.attention.sexo }}</strong></span>
              <span>TURNO: <strong>{{ props.attention.turno }}</strong></span>
            </div>
          </div>
          <hr>
          <input v-if="(props.attention.estado_atencion=='EN ESPERA' ||
          props.attention.estado_atencion=='INCOMPLETA') && esAdmin"
            placeholder=" Diagnóstico"
            type="text"
            list="diagnostico"
            v-model="diagnostico.nombre_diagnostico"
          />
          <span v-else>DIAGNÓSTICO: <strong>{{ nombre_diagnostico}} </strong></span>
          <datalist id="diagnostico">
            <option
              :value="item.nombre_diagnostico"
              v-for="item in resultDiagnosis"
              :key="item.id">
              {{ item.nombre_diagnostico }}
            </option>
          </datalist>

          <textarea
            v-if="(props.attention.estado_atencion=='EN ESPERA' ||
            props.attention.estado_atencion=='INCOMPLETA') && esAdmin"
            placeholder=" Descripción del diagnóstico"
            v-model="diagnostico.descripcion"></textarea>

          <span v-else>DESCRIPCIÓN: <strong>{{ descripcion }}</strong></span>
          <hr>
          <!-- <div class="table-wrapper"> -->
            <table v-if="(props.attention.estado_atencion=='EN ESPERA' || props.attention.estado_atencion=='INCOMPLETA') && esAdmin" class="content-table">
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
                <tr v-for="(item, nro) of receta" v-bind:key="item.id">
                  <td data-title="MEDICAMENTO">
                    <input
                      placeholder="Medicamento"
                      type="text"
                      list="medicamento"
                      v-model="receta[nro].nombre_medicamento"
                      @blur="validarDuplicado(nro)"
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

            <table v-else-if="props.attention.estado_atencion=='EN ATENCIÓN'" class="content-table">
              <thead>
                <tr>
                  <th>MEDICAMENTO</th>
                  <th>INDICACIÓN</th>
                  <th>RECETADA</th>
                  <th>DISPENSADA</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of resultPrescription" v-bind:key="item.id">
                  <td data-title="MEDICAMENTO">
                    <span>{{ item.nombre_medicamento }}</span>
                  </td>
                  <td data-title="INDICACIÓN">
                    <span>{{ item.indicacion }}</span>
                  </td>
                  <td data-title="C. RECETADA">
                    <span>{{item.cantidad_recetada}}</span>
                  </td>
                  <td data-title="C. DISPENSADA">
                    <input
                      type="number"
                      placeholder="Cantidad recetada"
                      v-model="resultPrescription[index].cantidad_dispensada"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table v-else-if="props.attention.estado_atencion=='FINALIZADA'" class="content-table">
              <thead>
                <tr>
                  <th>MEDICAMENTO</th>
                  <th>INDICACIÓN</th>
                  <th>RECETADA</th>
                  <th>DISPENSADA</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) of resultPrescription" v-bind:key="item.id">
                  <td data-title="MEDICAMENTO">
                    <span>{{ item.nombre_medicamento }}</span>
                  </td>
                  <td data-title="INDICACIÓN">
                    <span>{{ item.indicacion }}</span>
                  </td>
                  <td data-title="C. RECETADA">
                    <span>{{item.cantidad_recetada}}</span>
                  </td>
                  <td data-title="C. DISPENSADA">
                    <span>{{item.cantidad_dispensada}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          <div v-show="props.attention.estado_atencion=='FINALIZADA'" class="img-logos">
            <section class="author">
              <span>{{ usuario_farmacia }}</span>
              <span>Dispensando por</span>
            </section>
            <section class="author">
              <span>{{ usuario_diagnostico }}</span>
              <span>Recetado por</span>
            </section>
            <section>
              <span></span>
              <span></span>
            </section>
          </div>
        </section>
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
        <button
          v-show="(props.attention.estado_atencion=='EN ESPERA' ||
          props.attention.estado_atencion=='INCOMPLETA') && esAdmin"
          class="form-btn btn-attention"
          type="button"
          v-on:click="addMedication">
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
        <button
          v-show="(props.attention.estado_atencion=='EN ESPERA' && esAdmin)||
          props.attention.estado_atencion=='EN ATENCIÓN' ||
          (props.attention.estado_atencion=='INCOMPLETA' && esAdmin)"
          class="form-btn btn-accept"
          type="submit">
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
        <button
          v-show="props.attention.estado_atencion=='FINALIZADA'"
          class="form-btn btn-upload-pdf"
          type="button"
          @click="descargarPDF">
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
          DESCARGAR PDF
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js'

import '@/assets/styles/modalForm.css'
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { attentionService } from '@/services/Atencion'
import { onMounted, reactive, ref, computed } from 'vue'
import Swal from 'sweetalert2'

import { useUsuarioStore } from '@/store/usuario.js'
import { userService } from '@/services/Usuario'
let authStore = useUsuarioStore()
let usuario = computed(() => authStore.usuario)

let esAdmin = computed(() => usuario.value?.id_rol === 1 || usuario.value?.id_rol==2)

let nombre_diagnostico=ref("")
let descripcion=ref("")
let usuario_farmacia=ref("");
let usuario_diagnostico=ref("");

let props=defineProps({
  attention: {
    type: Object,
    required: true,
  },
});

let diagnostico = reactive({
  nombre_diagnostico: '',
  descripcion: '',

})
let estado_atencion = 'EN ATENCIÓN'
let receta = reactive([])

let resultDiagnosis = ref([])
let resultMedication = ref([])
let resultPrescription = ref([])
let userAuthors=ref([])
let result = ref([])


onMounted(async () => {
  try {
    if(props.attention.estado_atencion=="EN ESPERA" ||
      props.attention.estado_atencion=="INCOMPLETA"
    ){
      resultDiagnosis.value = await attentionService.showDiagnosis();
      resultMedication.value = await attentionService.showMedication();
    }
    else if(props.attention.estado_atencion=="EN ATENCIÓN" ||
            props.attention.estado_atencion=="FINALIZADA"){
      resultPrescription.value=await attentionService.showPrescription(props.attention.id);
      userAuthors.value=await userService.showUserAuthors(props.attention.id);

      nombre_diagnostico.value=resultPrescription.value[0].nombre_diagnostico;
      descripcion.value=resultPrescription.value[0].descripcion;
      usuario_diagnostico=userAuthors.value[0].usuario_diagnostico;
      usuario_farmacia=userAuthors.value[0].usuario_farmacia;

    }
  } catch (error) {
    console.log('error en el diagnostico: ', error)
  }
})

/*  */
const validarDuplicado = (index) => {
  const actual = receta[index].nombre_medicamento?.trim().toLowerCase()

  const existe = receta.some((item, i) =>
    i !== index &&
    item.nombre_medicamento?.trim().toLowerCase() === actual
  )

  if (existe && actual !== "") {
    Swal.fire({
      icon: 'warning',
      title: 'Medicamento duplicado',
      text: 'Existen medicamentos duplicados',
    })

    // Limpia el duplicado
    receta[index].nombre_medicamento = ''
  }
}

/*  */

let addMedication = () => {
  const nuevo = {
    nombre_medicamento: '',
    indicacion: '',
    recetada: 0,
    dispensada: 0,
  }
  receta.push(nuevo)
}

let deleteMedication = () => {
  receta.pop()
}

const emits = defineEmits(['modifyModalAttention'])
const sendValueModal = () => {
  emits('modifyModalAttention', false)
}
const createMedicalDescription = async () => {
  try {
    if(props.attention.estado_atencion=="EN ESPERA" ||
      props.attention.estado_atencion=="INCOMPLETA"
    ){
      if (!diagnostico.nombre_diagnostico) {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacios',
          text: `Por favor complete todos los campos`,
        })
        return
      }
      if(receta.length<=0){
        estado_atencion="FINALIZADA"
      }
      result.value = await attentionService.createMedicalDescription(props.attention.id, {
        diagnostico,
        receta,
        estado_atencion,
        id_usuario_rol_diagnostico:usuario.value.id
      })

      if (result.value.ok) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tus datos fueron registrados',
          icon: 'success',
        })
      }
      sendValueModal()
    }
    else if(props.attention.estado_atencion=="EN ATENCIÓN"){
      result.value=await attentionService.updateMedicalDescription(
        props.attention.id,
        {resultPrescription:resultPrescription.value,
          estado_atencion:"FINALIZADA",
          id_usuario_rol_farmacia: usuario.value.id
        }
      )
      if (result.value.ok) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'Tus datos fueron actualizados',
          icon: 'success',
        })
      }
      sendValueModal()
    }

  } catch (error) {
    console.log('Error en crear la receta y diagnostico', error)
  }
}

/* Para descargar un pdf */
const pdfContent = ref(null)

const descargarPDF = () => {
  const element = pdfContent.value

  // 🔹 Guardamos estilos originales
  const originalOverflow = element.style.overflow
  const originalMaxHeight = element.style.maxHeight

  // 🔹 Quitamos el scroll TEMPORALMENTE
  element.style.overflow = "visible"
  element.style.maxHeight = "none"

  const options = {
    margin: 5,
    filename: `descripcion_medica_${props.attention.nombres}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      scrollY: 0,
      useCORS: true,
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  html2pdf()
    .from(element)
    .set(options)
    .save()
    .then(() => {
      // 🔹 Restauramos el scroll después del PDF
      element.style.overflow = originalOverflow
      element.style.maxHeight = originalMaxHeight
    })
}
</script>

<style scoped>
.register-form-modal{
  font-size: 15px;
  row-gap: 3px;
}
.img-logos{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
}

.author{
  padding-top:15px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}

.title-form-modal{
  display:flex;
  justify-content: center;
}

.content-table {
  font-size: 15px;
}
.row-description-modal{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
}

.column-description-modal {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  flex: 1; /* Ambas columnas ocupan igual ancho */
}
@media (max-width: 768px) {
  .content-form-modal {
    margin-left: 50px;
  }
}
/* dasdasda */
.content-table {
  page-break-inside: auto;
}

.content-table tr {
  page-break-inside: avoid;
  page-break-after: auto;
}

.content-table thead {
  display: table-header-group;
}
</style>
