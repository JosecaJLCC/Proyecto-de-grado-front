import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/stablishment'

const crearEstablecimiento = async(Establecimiento)=>{
  const data = await axios.post(API_URL+'/create', Establecimiento);
  return data;
}

const obtenerEstablecimiento = async()=>{
  const data = await axios.get(API_URL+'/show');
  return data;
}

const obtenerEstablecimientoById = async(id)=>{
  const data = await axios.get(API_URL+`/show/${id}`);
  return data;
}

const eliminarEstablecimiento = async(id) =>{
  const data = await axios.delete(API_URL+`/delete/${id}`)
}

export const establecimientoService = {
  crearEstablecimiento,
  obtenerEstablecimiento,
  obtenerEstablecimientoById,
  eliminarEstablecimiento
}

