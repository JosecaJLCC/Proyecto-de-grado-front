import axios from "axios";

export class Usuario {
  async obtenerUsuario() {
    let token = localStorage.getItem("token");
    /*Si sale error aqui, Se debe eliminar el token de local storage*/
    if (!token) return;

    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.data; // Retorna directamente los datos.
    } catch (error) {
      console.log("Error al obtener el perfil", error);
      if (error.response?.status === 401) {

        return null;  // Retorna null si el token expiró
      }
    }
  }

  cerrarSesion(){
    localStorage.removeItem('token')
  }
}
