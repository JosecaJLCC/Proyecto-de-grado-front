<template>
  <div class="landing">

    <!-- HEADER -->
    <header class="header">
      <img src="../assets/CapacabanaLogo.png" class="logo" />
      <router-link to="/login" class="btn-login">Iniciar Sesión</router-link>
    </header>

    <!-- MAIN -->
    <main>

      <!-- CARRUSEL -->
      <section class="carousel">
        <img :src="imagenes[indice]" class="carousel-img" />
      </section>

      <!-- MISIÓN Y VISIÓN -->
      <section class="about">
        <div class="about-text">
          <h2>Nuestra Misión</h2>
          <p>
            El Centro de Salud Copacabana tiene como misión brindar atención integral
            de primer nivel con calidad, calidez y compromiso.
          </p>

          <h2>Nuestra Visión</h2>
          <p>
            Consolidarse como un referente en la atención primaria de salud,
            garantizando servicios eficientes y humanizados.
          </p>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <p>© 2025 Centro de Salud Copacabana</p>
      <p>Todos los derechos reservados</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const imagenes = [
  new URL('../assets/slide1.jpg', import.meta.url),
  new URL('../assets/slide2.jpg', import.meta.url),
  new URL('../assets/slide3.jpg', import.meta.url),
]

const indice = ref(0)

onMounted(() => {
  setInterval(() => {
    indice.value = (indice.value + 1) % imagenes.length
  }, 3000)
})
</script>

<style scoped>
.landing {
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;

  background-image: url("../assets/CapacabanaLogo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 350px;
  background-attachment: fixed;

  background-color: #f4f6f9; /* respaldo si no carga la imagen */
}

/* HEADER */
.header {
  height: 70px;
  background: #1e40af;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  color: white;
}

.logo {
  width: 50px;
}

.btn-login {
  background: #22c55e;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

/* CARRUSEL */
.carousel {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
}

.carousel-img {
  width: 90%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 20px;
}

/* ABOUT */
.about {
  padding: 80px 40px;
  text-align: center;
}

.about-text {
  max-width: 700px;
  margin: auto;
}

/* FOOTER */
.footer {
  background-color: #1e293b;
  color: white;
  text-align: center;
  padding: 20px;
}
</style>
