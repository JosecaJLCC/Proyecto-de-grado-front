<template>
  <div class="container-table">
    <div class="content-date">
        <span>DE FECHA: </span>
        <input v-model="fechas.fecha_inicial" type="date">
        <span>A FECHA: </span>
        <input v-model="fechas.fecha_final" type="date">
        <button class="btn-add-item" v-on:click.prevent="showReport"><strong>BUSCAR</strong></button>
        <button class="btn-add-item btn-pdf" @click="descargarPDF"><strong>DESCARGAR EXCEL</strong></button>
      </div>
    <div>
    <!-- ESTE CONTENEDOR SÍ SE EXPORTA -->
    <div ref="excelArea">

      <div class="header-report">
        <img src="../../assets/escudo.png" class="logo" alt="">
        <h3 class="title">REPORTE DE ATENCIONES</h3>
        <img src="../../assets/CapacabanaLogo.png" class="logo" alt="">
      </div>

      <div class="content-report">
        <div class="data-report">
          <span>SEDES: <strong>LA PAZ</strong></span>
          <span>MUNICIPIO: <strong>EL ALTO</strong></span>
          <span>RED DE SALUD: <strong>COREA</strong></span>
        </div>

        <div class="data-report">
          <span>DESDE FECHA: <strong>{{ fechas.fecha_inicial }}</strong></span>
          <span>HASTA FECHA: <strong>{{ fechas.fecha_final }}</strong></span>
          <span>CODIGO: <strong>200804</strong></span>
          <span>ESTABLECIMIENTO: <strong>COPACABANA</strong></span>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="content-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>FECHA ATENCIÓN</th>
              <th>N° CI</th>
              <th>FECHA DE NACIMIENTO</th>
              <th>EDAD</th>
              <th>SEXO</th>
              <th>TELÉFONO</th>
              <th>MUNICIPIO</th>
              <th>DIAGNÓSTICO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, Nro) of originalData" v-bind:key="item.id">
              <td data-title="N°">{{ Nro + 1 }}</td>
              <td data-title="CODIGO">{{ item.fecha_atencion.split(" ")[0]}}</td>
              <td data-title="MICRORED">{{ item.ci }}</td>
              <td data-title="MICRORED">{{ item.fecha_nacimiento.split(" ")[0] }}</td>
              <td data-title="RED">{{ item.edad }}</td>
              <td data-title="DIRECTOR">{{ item.sexo }}</td>
              <td data-title="DIRECTOR">{{ item.nro_telf }}</td>
              <td data-title="DIRECTOR">{{ item.municipio }}</td>
              <td data-title="DIRECTOR">{{ item.nombre_diagnostico }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    </div>
  </div>
</template>

<script setup>
import '@/assets/styles/table.css'
import '@/assets/styles/tableComponent.css'
import { microredService } from '@/services/Microred.js'
import { attentionService } from '@/services/Atencion.js';
import { computed, onMounted, ref, reactive, watch } from 'vue'
import Swal from 'sweetalert2'

let data = ref([])
let originalData = ref([])

let fechas=reactive({
  fecha_final:"",
  fecha_inicial:""
})
let resultReport=ref([])

const showReport = async () => {
  try {
    resultReport.value = await attentionService.showReport(fechas)

    if (resultReport.value.ok) {
      console.log("result report: ", resultReport.value.data)

      data.value = resultReport.value.data
      originalData.value = [...resultReport.value.data]
    }
    else {
      Swal.fire({
        title: '¡Registro Fallido!',
        text: resultReport.value.message,
        icon: 'error',
      })
    }

  } catch (error) {
    console.log("Error en reporte:", error)
    Swal.fire({
      title: 'Error',
      text: 'No se pudo generar el reporte',
      icon: 'error',
    })
  }
}

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


const excelArea = ref(null)

const descargarPDF = () => {
  const tabla = excelArea.value.querySelector('table')

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.table_to_sheet(tabla)

  XLSX.utils.book_append_sheet(wb, ws, 'Reporte')

  const excelBuffer = XLSX.write(wb, {
    type: 'array',
    bookType: 'xlsx'
  })

  const data = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  })

  saveAs(data, 'reporte_atenciones.xlsx')
}

</script>

<style scoped>
.logo{
  width: 50px;
  height: 50px;
}
  .header-report{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 5px 0;
  }

  .content-date{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 10px;
    column-gap: 10px
  }

  .content-report{
    display:flex;
    justify-content: space-evenly;
  }

  .data-report{
    display: flex;
    flex-direction: column;
  }

  input{
    border-radius: 20px;
  }

  .container-table{
    background-color: white;
  }
</style>
