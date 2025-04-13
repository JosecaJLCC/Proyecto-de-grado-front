import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            tamanioSidebar: '300px'
        }
    },

    actions: {
      toggleSidebar(){
        this.tamanioSidebar = this.tamanioSidebar === "300px" ? "50px" : "300px";
      }
    },
});
