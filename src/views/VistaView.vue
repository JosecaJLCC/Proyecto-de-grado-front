<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-2/3 p-6">
      <h2 class="text-xl font-bold mb-4">Registrar Microred</h2>

      <!-- Tabs -->
      <div class="flex border-b mb-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-4 py-2"
          :class="activeTab === tab ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Contenido según el tab -->
      <div v-if="activeTab === 'Datos Personales'">
        <input type="text" placeholder="Nombre" class="input-text mb-2" />
        <input type="text" placeholder="Apellido" class="input-text" />
      </div>

      <div v-else-if="activeTab === 'Dirección'">
        <input type="text" placeholder="Ciudad" class="input-text mb-2" />
        <input type="text" placeholder="Zona" class="input-text" />
      </div>

      <div v-else-if="activeTab === 'Historial'">
        <textarea placeholder="Observaciones" class="input-text w-full h-24"></textarea>
      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-end">
        <button class="bg-gray-300 px-4 py-2 rounded mr-2">Cancelar</button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const tabs = ["Datos Personales", "Dirección", "Historial"]
const activeTab = ref(tabs[0])
</script>

<style scoped>
.input-text {
  @apply border rounded px-3 py-2 w-full;
}
</style>
