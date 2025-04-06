<template>
  <div>
    <Sidebar/>
    <div class="container-newregister">

      <fieldset class="form-newregister">
        <legend class="legend-newregister">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newregister"/> -->
           <span class="titulo-newregister">DATOS PERSONALES</span>
        </legend>

        <div class="form-content-newregister">
          <section class="content-newregister">
            <label for="">CI</label>
            <input type="text">
            <label for="">EXPEDIDO</label>
            <select name="" id="">
              <option value="LP">LP</option>
              <option value="SC">SC</option>
              <option value="CB">CB</option>
              <option value="PT">PT</option>
              <option value="OR">OR</option>
              <option value="BN">BN</option>
              <option value="PD">PD</option>
              <option value="TJ">TJ</option>
              <option value="CH">CH</option>
            </select>
            <label for="">NOMBRES</label>
            <input type="text">
            <label for="">AP. PATERNO</label>
            <input type="text">
            <label for="">AP. MATERNO</label>
            <input type="text">
          </section>

          <section class="content-newregister">
            <label for="">TELEFONO</label>
            <input type="text">
            <label for="">ESTADO CIVIL</label>
            <select name="" id="">
                <option value="SOLTERO">SOLTERO/A</option>
                <option value="CASADO">CASADO/A</option>
                <option value="DIVORCIADO">DIVORCIADO/A</option>
                <option value="VIUDO">VIUDO/A</option>
                <option value="CONCUBINATO">CONCUBINATO/A</option>
              </select>
            <label for="">FECHA DE NACIMIENTO</label>
            <input type="date">
            <label for="">NACIONALIDAD</label>

            <select name="" id="">
              <option value="BOLIVIANO">BOLIVIANO</option>
              <option value="EXTRANJERO">EXTRANJERO</option>
            </select>

            <label for="">SEXO</label>

            <select name="" id="">
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="FEMENINO">OTRO</option>
            </select>

          </section>

          <section class="content-newregister">
            <label for="">DEPARTAMENTO</label>
              <select name="" id="">
                <option value="LA PAZ">LA PAZ</option>
                <option value="SANTA CRUZ">SANTA CRUZ</option>
                <option value="COCHABAMBA">COCHABAMBA</option>
                <option value="POTOSI">POTOSI</option>
                <option value="ORURO">ORURO</option>
                <option value="BENI">BENI</option>
                <option value="PANDO">PANDO</option>
                <option value="TARIJA">TARIJA</option>
                <option value="CHUQUISACA">CHUQUISACA</option>
              </select>
            <label for="">MUNICIPIO</label>
            <input type="text">
            <label for="">ZONA</label>
            <input type="text">
            <label for="">AVENIDA/CALLE</label>
            <input type="text">
            <label for="">NRO PUERTA</label>
            <input type="text">
          </section>
        </div>
        <div class="form-content-newregister2">
          <button class="form-btn btn-cancel"><CIcon :icon="cilX" class="icon-newregister"/>CANCELAR</button>
          <button class="form-btn btn-accept"><CIcon :icon="cilCheckAlt" class="icon-newregister"/>CONTINUAR</button>
        </div>

      </fieldset>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilUserPlus, cilCheckAlt, cilX } from '@coreui/icons';

</script>

<style scoped>
.container-newregister{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 300px;

    min-height: 100vh;
    /* border: 2px solid gold; */
  }

  .form-newregister{
    display: flex;
    flex-direction: column;
    background-color: rgb(0, 128, 128);
    border: none;
    margin-top: 80px;
    border: 2px solid black;
    border-radius: 20px;
    padding: 20px;
    row-gap: 20px;
  }

  /* NOTA: ARREGLAR EL PADDING O EL MARGIN TOP YA QUE EL FORM SE VA HACIA ARRIBA CUANDO SE ACHICA */
  .form-content-newregister{
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    border: 2px solid gold;
  }

  .content-newregister{
    display: flex;
    flex-direction: column;
    /* column-gap: 15px; */
    flex-grow: 1;

    flex-wrap: wrap;
    /* min-height: 100vh; */
    border: 2px solid green;
  }

  .content-newregister > input{
    padding-left:5px;
  }

  input, select/* , .form-btn  */{
    border-radius: 20px;
    outline: none;
    border: none;
    width: 100%;
    height: 20px;
  }



  .legend-newregister{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .titulo-newregister {
    display: flex;
    background-color: rgb(224, 63, 62);
    border-radius: 20px;
    padding: 5px;
    font-weight: bold;
  }

  .icon-newregister{
    width: 20px;
    height: 20px;
    /* background-color: rgb(224, 63, 62) */;
  }

  .form-content-newregister2{
    display: flex;
    justify-content: space-around;
    /* padding: 50px; */
    border: 3px solid brown;
  }

  .form-btn{
    background-color: rgb(224, 63, 62);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    outline: none;
    border: none;
    min-width: 200px;
    height: 20px;
  }

  .form-btn:hover{
    background-color: #00ffc8;
  }




</style>
