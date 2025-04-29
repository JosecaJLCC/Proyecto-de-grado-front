<template>
  <div>
    <Sidebar/>
    <main :style="{paddingLeft: paddingLeft}" class="main-layout">
    <RouterView />
  </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { useSidebarStore } from '@/store/sidebar.js';
import { computed } from 'vue';
let sidebarStore = useSidebarStore();
let paddingLeft=computed(()=>sidebarStore.tamanioSidebar);


</script>

<style scoped>
  .main-layout{
    padding-top: 83px;
    transition: padding-left 0.3s ease;
  }
  @media (max-width: 620px) {
    .main-layout {
    padding-left: 50px !important;
  }
}
</style>
