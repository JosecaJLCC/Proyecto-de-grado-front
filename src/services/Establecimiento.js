import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/establishment'

const createEstablishment = async(establishment)=>{
  const {data} = await axios.post(API_URL+'/create', establishment);
  return data;
}

const showEstablishment = async(estado_establecimiento)=>{
  const {data} = await axios.get(API_URL+`/show/${estado_establecimiento}`);
  return data.data;
}

const deleteEstablishment = async(id) =>{
  const {data} = await axios.patch(API_URL+`/delete/${id}`)
  return data;
}

const updateEstablishment = async(id, establishment) =>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, establishment)
  return data;
}

const reactivateEstablishment = async(id) =>{
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`)
  return data;
}

export const establishmentService = {
  createEstablishment,
  showEstablishment,
  deleteEstablishment,
  updateEstablishment,
  reactivateEstablishment
}

