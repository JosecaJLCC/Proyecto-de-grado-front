<template>
  <div class="container-report">
    <div class="content-date">
      <span>DE: </span>
      <input v-model="fechas.fecha_inicial" type="date">
      <span>A: </span>
      <input v-model="fechas.fecha_final" type="date">
      <button class="btn-pdf" v-on:click.prevent="showReport"><strong>BUSCAR</strong></button>

    </div>
    <div class="content-report" ref="pdfContent">
      <header class="header-report">
        <img src="../assets/escudo.png" class="logo" alt="">
        <h3 class="title">REPORTE DE ATENCIONES</h3>
        <img src="../assets/CapacabanaLogo.png" class="logo" alt="">
      </header>
      <main class="main-report">
        <section class="section-report cocapabana-report">
          <h4 class="title-cs">CENTRO DE SALUD COPACABANA</h4>
          <article class="article-report">
            <span>Atenciones finalizadas:</span>
            <span>Atenciones inconclusas:</span>
            <span>Medicamentos dispensados:</span>
          </article>
        </section>
        <section class="section-report villazon-report">
          <h4 class="title-cs">CONSULTORIO VECINAL VILLAZÓN</h4>
          <article class="article-report">
            <span>Atenciones finalizadas:</span>
            <span>Atenciones inconclusas:</span>
            <span>Medicamentos dispensados:</span>
          </article>
        </section>
        <section class="section-report elizardo-perez-report">
          <h4 class="title-cs">CONSULTORIO VECINAL ELIZARDO PEREZ</h4>
          <article class="article-report">
            <span>Atenciones finalizadas:</span>
            <span>Atenciones inconclusas:</span>
            <span>Medicamentos dispensados:</span>
          </article>
        </section>
        <section class="section-report total">

          <article class="article-report">
            <span>Total de atenciones finalizadas: </span>
            <span>Total de atenciones inconclusas: </span>
            <span>Total de medicamentos dispensados: </span>
            <span>Atenciones duplicadas: </span>

          </article>
        </section>

      </main>

    </div>
<button class="btn-pdf" @click="descargarPDF"><strong>DESCARGAR PDF</strong></button>
  </div>
</template>

<script setup>
import { attentionService } from '@/services/Atencion';
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2'
let fechas=reactive({
  fecha_final:"",
  fecha_inicial:""
})
let resultReport=ref([])
let copacabana=reactive({})
let villazon=reactive({})
let elizardo_perez=reactive({})


const showReport=async()=>{
  resultReport.value= await attentionService.showReport(fechas);
  if(resultReport.value.ok){
    console.log("result report: ", resultReport.value)
    copacabana=resultReport.value[0]
    villazon=resultReport.value[1]
    elizardo_perez=resultReport.value[2]
  }
  else{
    Swal.fire({
      title: '¡Registro Exitoso!',
      text: 'Tus datos fueron registrados',
      icon: 'success',
    })
  }
}
/* reportes */
import html2pdf from 'html2pdf.js'

const pdfContent = ref(null)

const descargarPDF = () => {
  const element = pdfContent.value

  const options = {
    margin: 10,
    filename: `reporte_${fechas.fecha_inicial}_a_${fechas.fecha_final}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  }

  html2pdf().set(options).from(element).save()
}
</script>

<style scoped>
  .container-report{
    width: 100dvw;
    display: flex;
    flex-direction: column;
    row-gap:10px;
    align-items: center;
    border:2px solid black;

  }

  .content-date{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 10px;
    column-gap: 10px
  }

  .content-report{
    width: 420px;

    border:2px solid black;
    background-color: var(--color-white);
    height: 400px;   /* ajusta esta altura a tu gusto */
    overflow-y: auto;
    overflow-x: hidden;

  }
  /* Scroll más elegante (opcional) */
  .content-report::-webkit-scrollbar {
    width: 6px;
  }
  .content-report::-webkit-scrollbar-thumb {
    background: rgba(0, 128, 128, 0.7);
    border-radius: 10px;
  }

  .logo{
    width: 50px;
    height: 50px;

  }

  .title{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    border-radius: 20px;
    padding:0 5px;
  }

  .header-report{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }

  .title-cs{
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
  }
  span{
    color: var(--color-black)
  }

  .article-report{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .total{
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  input{
    border-radius: 20px;
  }

  .btn-pdf{
    padding:10px;
    outline: none;
    border: none;
    background-color: var(--color-green);
    color: var(--color-white);
    border-radius: 20px;
  }
</style>
