<template>
  <div class="landing">

    <!-- HEADER -->
    <header class="header">
      <img src="../assets/CapacabanaLogo.png" class="logo" />
      <router-link to="/login" class="btn-login">Iniciar Sesión</router-link>
    </header>

    <!-- MAIN -->
    <main>

      <!-- SLIDER AUTOMÁTICO -->
      <!-- SLIDER MEJORADO -->
<section class="carousel">
  <transition name="fade-zoom" mode="out-in">
    <img
      :key="currentImage"
      :src="images[currentImage]"
      class="carousel-img"
    />
  </transition>

  <!-- OSCURECER SUAVEMENTE LA IMAGEN -->
  <div class="overlay"></div>

  <!-- INDICADORES -->
  <div class="indicators">
    <span
      v-for="(img, index) in images"
      :key="index"
      :class="{ active: index === currentImage }"
      @click="currentImage = index"
    ></span>
  </div>
</section>

      <!-- MISIÓN Y VISIÓN LADO A LADO -->
      <section class="about">
        <div class="about-card">
          <h2>Misión</h2>
          <p>
            Brindar atención integral de primer nivel, enfocada en la promoción, prevención, diagnóstico y tratamiento oportuno, satisfaciendo las necesidades de los usuarios mediante una atención humanizada, eficaz, accesible y de calidad, con profesionales capacitados y motivados
          </p>
        </div>

        <div class="about-card">
          <h2>Visión</h2>
          <p>
            Mejorar la calidad de vida de la comunidad, garantizando servicios de salud con calidez y consolidándose como un referente en la atención primaria de salud, siendo un modelo de excelencia y compromiso con los usuarios.
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
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  new URL('../assets/copacabana1.jpeg', import.meta.url).href,
  new URL('../assets/copacabana2.jpeg', import.meta.url).href,
  new URL('../assets/copacabana3.jpeg', import.meta.url).href
]

const currentImage = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length
  }, 3000) // ✅ cada 3 segundos
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
/* GENERAL */
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: rgb(0, 128, 128);
  color: white;
  position: fixed;
  z-index:1000;
  width: 100dvw;
}

.logo {
  height: 60px;
  border-radius: 50%;
}

.btn-login {
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  cursor:pointer;
  transition: 0.5s;
}

.btn-login:hover{
 color: var(--color-primary);
 background-color: var(--color-white);
 transition: 0.5s;
}

/* SLIDER */
/* SLIDER */
.carousel {
  width: 100%;
  height: 420px;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 25px 25px;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* ANIMACIÓN SUAVE */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 1s ease;
}

.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.fade-zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-zoom-leave-from {
  opacity: 1;
}

.fade-zoom-leave-to {
  opacity: 0;
}

/* OVERLAY OSCURO */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.6)
  );
  z-index: 1;
}

/* INDICADORES */
.indicators {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.indicators span {
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicators span.active {
  background: white;
  transform: scale(1.3);
}



/* MISIÓN Y VISIÓN */
.about {
  display: flex;
  gap: 30px;
  padding: 60px 40px;
  background: #f5f5f5;
}

.about-card {
  flex: 1;
  background: white;
  padding: 35px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.about-card:hover{
 transform: scale(1.05); /* crece 5% */
}

.about-card h2 {
  color: rgb(0, 128, 128);
  margin-bottom: 15px;
}

/* FOOTER */
.footer {
  margin-top: auto;
  background: rgb(0, 128, 128);
  text-align: center;
  padding: 15px;
  color: white;
}

p{
  color: var(--color-black)
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .about {
    flex-direction: column;
  }

  .carousel {
    height: 260px;
  }
}
</style>
