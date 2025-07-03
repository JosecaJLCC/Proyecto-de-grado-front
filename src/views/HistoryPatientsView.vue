<template>
     <main class="container-generalhistoryview">
      <TableHistoryPatient/>
     </main>
  </template>

  <script setup>
    import TableHistoryPatient from '@/components/TableHistoryPatient.vue';
  </script>

  <style scoped>
    .container-generalhistoryview{
        color: black;
        
        transition: width 0.3s ease;
        width: 100%;
        max-width: 100%;
    }
  </style>
