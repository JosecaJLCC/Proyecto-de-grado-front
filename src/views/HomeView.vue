<template>
  <main class="container-homeview">
    <TableHome/>
  </main>
</template>

<script setup>
  import { Usuario } from '@/models/Usuario.js';
  import { onMounted } from 'vue';
  import TableHome from '@/components/TableHome.vue';
  onMounted(async() => {
    let usuario = new Usuario();
    let data = await usuario.obtenerUsuario();
    console.log("data", data)

  })
</script>

<style scoped>
.container-homeview{
    color: black;
    /* border: 3px solid green; */
    transition: width 0.3s ease;
    width: 100%;
    max-width: 100%;
}
</style>
