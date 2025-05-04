// src/stores/usuario.js
import { defineStore } from 'pinia'
import { Usuario } from '@/services/Usuario.js'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null,
  }),
  actions: {
    async cargarUsuario() {
      try {
        const servicio = new Usuario()
        const data = await servicio.obtenerUsuario()
        /* data[0] porque es un array de objetos */
        this.usuario = data[0]
      } catch (error) {
        console.error('Error al cargar el usuario:', error)
        this.usuario = null
      }
    },
    cerrarSesion() {
      const servicio = new Usuario();
      servicio.cerrarSesion();
      this.usuario = null;
    }
  }
})
