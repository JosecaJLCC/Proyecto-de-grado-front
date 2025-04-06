class Token{
  static cerrarSesion = () => {
    localStorage.removeItem('token');
    token.value = null;
    nombre_usuario.value = "";
    correo.value = "";
    router.push({ name: 'login' });
  };

  static obtenerPerfil = async () => {
    if (!token.value) return;

    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/users/profile", {
        headers: { Authorization: `Bearer ${token.value}` }
      });

      console.log("home:", data.msg[0].nombre_usuario);
      nombre_usuario.value = data.msg[0].nombre_usuario;
      correo.value = data.msg[0].correo;
    } catch (error) {
      console.error("Error en home", error);
      if (error.response?.status === 401) {
        console.warn("Token expirado. Redirigiendo a login...");
        cerrarSesion();
      }
    }
  };
}
