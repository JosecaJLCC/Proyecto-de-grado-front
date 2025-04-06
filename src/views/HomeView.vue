<template>
  <div>
    <Sidebar/>
    <div id="container-home">
      <div id="buscador-dashboard">
        <input type="text" placeholder="Ingrese su CI">
        <button>BUSCAR</button>
      </div>
      <h1>Bienvenido Usuario</h1>
      <h2>Nombre de usuario: {{ nombre_usuario }}</h2>
      <h2>Correo: {{ correo }}</h2>
      <table>
      <tr>
        <th>N°</th>
        <th>CI</th>
        <th>AP. PATERNO</th>
        <th>AP. MATERNO</th>
        <th>NOMBRES</th>
        <th>ATENCION</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      <tr>
        <td><strong>Alfreds Futterkiste</strong></td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Ernst Handel</td>
        <td>Roland Mendel</td>
        <td>Austria</td>
      </tr>
    </table>
    </div>
  </div>


</template>

<script setup>

import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';


let nombre_usuario = ref("");
let correo = ref("");
let token = ref(localStorage.getItem('token')); // Mantener reactivo el token
let router = useRouter();

// Redirigir si no hay token al cargar
if (!token.value) {
  router.push({ name: 'login' });
}

console.log("Token al inicio:", token.value);

// Función para obtener perfil
const obtenerPerfil = async () => {
  if (!token.value) return;

  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/users/profile", {
      headers: { Authorization: `Bearer ${token.value}` }
    });

    console.log("home:", data.msg[0].nombre_usuario);
    nombre_usuario.value = data.msg[0].nombre_usuario;
    correo.value = data.msg[0].correo;
  } catch (error) {
    console.error("Error en home", error);
    if (error.response?.status === 401) {
      console.warn("Token expirado. Redirigiendo a login...");
      cerrarSesion();
    }
  }
};

// Cerrar sesión y limpiar datos
const cerrarSesion = () => {
  localStorage.removeItem('token');
  token.value = null;
  nombre_usuario.value = "";
  correo.value = "";
  router.push({ name: 'login' });
};

// 🔥 Verificar el perfil al montar
onMounted(() => {
  obtenerPerfil();
});

// 🔥 Observar cambios en el token
watch(token, async (newToken) => {
  console.log("Nuevo token detectado:", newToken);
  if (!newToken) {
    cerrarSesion();
  } else {
    await obtenerPerfil();
  }
}, { immediate: true }); // Ejecutar `watch` inmediatamente
</script>

<style scoped>
#container-home{
  padding-left: 300px;
  padding-top: 80px;
}

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



tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
