import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar',
  {
    state: () => {
        return {
            tamanioSidebar: '300px',
            tamanioLogo: '100px',
            cambioIcon: true,

        }
    },
    actions: {
      toggleSidebar(){
        this.tamanioSidebar = this.tamanioSidebar === "300px" ? "0px" : "300px";
        this.cambioIcon ? this.cambioIcon=false : this.cambioIcon=true;
        this.tamanioLogo = this.tamanioLogo === "100px" ? "0px" : "100px";
      }
    },
  }
);
