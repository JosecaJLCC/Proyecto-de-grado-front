<template>
  <div id="container-table">
    <div id="buscador-table">
        <input type="text" placeholder="Ingrese su CI">
        <button>BUSCAR</button>
    </div>
    <h1>Bienvenido Usuario</h1>
    <h2>Nombre de usuario: {{ nombre_usuario }}</h2>
    <h2>Correo: {{ correo }}</h2>

    <table class="table">
      <thead>
        <tr>
          <th>N°</th>
          <th>CI</th>
          <th>AP. PATERNO</th>
          <th>AP. MATERNO</th>
          <th>NOMBRES</th>
        </tr>
      </thead>
      <br>
      <tbody>
        <tr>
          <td>1</td>
          <td>12796720 LP</td>
          <td>CONDORI</td>
          <td>CHAMBI</td>
          <td>JOSE LUIS</td>
        </tr>
        <tr>
          <td><strong>2</strong></td>
          <td>12796720 LP</td>
          <td>CONDORI</td>
          <td>CHAMBI</td>
          <td>JOSE LUIS</td>
        </tr>
        <tr>
          <td>3</td>
          <td>12796720 LP</td>
          <td>CONDORI</td>
          <td>CHAMBI</td>
          <td>JOSE LUIS</td>
        </tr>
        <tr>
          <td>4</td>
          <td>12796720 LP</td>
          <td>CONDORI</td>
          <td>CHAMBI</td>
          <td>JOSE LUIS</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script setup>

</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  color: black;
  background-color: white;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}



tbody tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
