import axios from 'axios'

let API_URL = `${import.meta.env.VITE_API_URL}/api/v1/establishment`

const createEstablishment = async(establishment)=>{
  const {data} = await axios.post(API_URL+'/create', establishment);
  return data;
}

const showEstablishment = async(estado_establecimiento)=>{
  const {data} = await axios.get(API_URL+`/show/${estado_establecimiento}`);
  return data.data;
}

const deleteEstablishment = async(id, id_usuario_rol) =>{
  const {data} = await axios.patch(API_URL+`/delete/${id}`, id_usuario_rol)
  return data;
}

const updateEstablishment = async(id, establishment) =>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, establishment)
  return data;
}

const reactivateEstablishment = async(id, id_usuario_rol) =>{
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`, id_usuario_rol)
  return data;
}

export const establishmentService = {
  createEstablishment,
  showEstablishment,
  deleteEstablishment,
  updateEstablishment,
  reactivateEstablishment
}

