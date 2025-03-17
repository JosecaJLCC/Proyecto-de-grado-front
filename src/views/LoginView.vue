<template>
  <div>
    <section id="formulario">
      
        <label for="">CORREO</label>
        <input v-model="correo" type="email" >
        <label for="">CONTRASEÑA</label>
        <input v-model="clave" type="password">
        <button v-on:click="iniciarSesion">INGRESAR</button>
        <a href="">¿Olvidaste tu contraseña?</a>
      
    </section>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router=useRouter();

  let correo = ref("");
  let clave = ref("");
  
  const iniciarSesion = async() =>{
    
    let {data} = await axios.post("http://localhost:3000/api/v1/users/login", {correo: correo.value, clave:clave.value}) 
    console.log("my_data: ",data)
    if(data.ok){
      localStorage.setItem('token', data.token);
      router.push({
        name:'home'
      })
    }
  }

</script>

<style scoped>
  #formulario{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    border: 3px solid green;
    background-color: #00ffcc;
  }
</style>