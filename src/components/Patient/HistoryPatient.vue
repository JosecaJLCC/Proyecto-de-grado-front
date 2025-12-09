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

          <span >DIAGNÓSTICO: <strong>{{ nombre_diagnostico}} </strong></span>
          <span >DESCRIPCIÓN: <strong>{{ descripcion }}</strong></span>
          <hr>
          <!-- <div class="table-wrapper"> -->
            <table  class="content-table">
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
          <div class="img-logos">
            <section class="author">
              <span>{{ usuario_farmacia }}</span>
              <span>Dispensando por</span>
            </section>
            <section class="author">
              <span>{{ usuario_diagnostico }}</span>
              <span>Recetado por</span>
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
import { attentionService } from '@/services/Atencion.js'
import { userService } from '@/services/Usuario.js'
import { onMounted, reactive, ref, computed } from 'vue'

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

let resultDiagnosis = ref([])
let resultMedication = ref([])
let resultPrescription = ref([])
let userAuthors=ref([])
let result = ref([])


onMounted(async () => {
  try {

      resultDiagnosis.value = await attentionService.showDiagnosis();
      resultMedication.value = await attentionService.showMedication();
      resultPrescription.value=await attentionService.showPrescription(props.attention.id);
      userAuthors.value=await userService.showUserAuthors(props.attention.id);
      console.log("prescription", resultPrescription.value);


      nombre_diagnostico.value=resultPrescription.value[0].nombre_diagnostico;
      descripcion.value=resultPrescription.value[0].descripcion;
      usuario_diagnostico=userAuthors.value[0].usuario_diagnostico;
      usuario_farmacia=userAuthors.value[0].usuario_farmacia;
  } catch (error) {
    console.log('error en el diagnostico: ', error)
  }
})

const emits = defineEmits(['modifyModalAttention'])
const sendValueModal = () => {
  emits('modifyModalAttention', false)
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
  padding-top:50px;
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
