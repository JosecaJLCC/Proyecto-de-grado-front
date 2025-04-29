<template>
  <div id="app-vue">
    <RouterView />
  </div>
</template>

<script setup>

</script>

<style scoped>
  #app-vue{
    width: 100%;
    min-height: 100dvh;

    background-image: url('@/assets/background.avif');
    background-size: cover;
    background-position: center;

    background-repeat: no-repeat;
  }
</style>
