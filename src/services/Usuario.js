import axios from "axios";

export class Usuario {
  async obtenerUsuario() {
    let token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.msg;  // Retorna directamente los datos.
    } catch (error) {
      console.log("Error al obtener el perfil", error);
      if (error.response?.status === 401) {
        console.warn("Token expirado. Redirigiendo a login...");
        return null;  // Retorna null si el token expiró
      }
    }
  }

  cerrarSesion(){
    localStorage.removeItem('token')
  }
}
