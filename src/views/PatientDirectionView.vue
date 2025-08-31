<template>
  <div>
    <div class="container-newregister">
      <fieldset class="form-newregister">
        <legend class="legend-newregister">
          <!-- <CIcon :icon="cilUserPlus" class="icon-newregister"/> -->
           <span class="titulo-newregister">DATOS ADICIONALES</span>
        </legend>
      </fieldset>
    </div>
  </div>
</template>

<script setup>

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


  /* NOTA: ARREGLAR EL PADDING O EL MARGIN TOP YA QUE EL FORM SE VA HACIA ARRIBA CUANDO SE ACHICA */
  .form-newregister{
    background-color: rgb(0, 128, 128);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 20px;
    /* width: 500px; */
    /* border: 2px solid gold; */
    border: none;
    margin-top: 80px;
  }

  .content-newregister{
    display: flex;
    flex-direction: column;
    /* align-items: stretch; */
    row-gap: 15px;
    /* border: 2px solid green; */
    flex-grow: 1;
    padding: 20px;
    flex-wrap: wrap;
    /* min-height: 100vh; */
  }

  .content-newregister > input{
    padding-left:5px;
  }

  input, select, .form-btn {
    border-radius: 20px;
    outline: none;
    border: none;
    width: 100%;
    height: 20px;
  }

  .legend-newregister{
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .titulo-newregister {
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

  .form-btn{
    background-color: rgb(224, 63, 62);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: white;
    font-weight: bold;
  }

  .form-btn:hover{
    background-color: #00ffc8;
  }




</style>
