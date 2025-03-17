<template>
 <header id="cabecera">
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink :to="{ name: 'login' }">Inicio de sesion</RouterLink> |
        <RouterLink :to="{ name: 'registeruser' }">Registrar</RouterLink> |
        <RouterLink :to="{ name: 'home' }">Inicio</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>

</script>

<style scoped>
 #cabecera{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
 }
</style>