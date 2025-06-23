<template>
    <main class="container-newperson">
      <FormPersona redirecTo="registrar-usuario"/>
    </main>
</template>

<script setup>
import FormPersona from '@/components/FormPersona.vue';
/* router */
</script>

<style scoped>
.container-newperson{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

  }
</style>
