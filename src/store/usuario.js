// src/stores/usuario.js
import { defineStore } from 'pinia'
import { Usuario } from '@/models/Usuario.js'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: null,
  }),
  actions: {
    async cargarUsuario() {
      try {
        const servicio = new Usuario()
        const data = await servicio.obtenerUsuario()

        this.usuario = data
      } catch (error) {
        console.log('Error al cargar el usuario:', error)
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

