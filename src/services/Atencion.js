import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/attention'

const createAttention = async(attention)=>{
  const {data} = await axios.post(API_URL+'/create', attention);
  return data;z
}

const showAttention = async()=>{
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

/* const showAttentionById = async(id_establecimiento)=>{
  const {data} = await axios.get(API_URL+`/show/${id_establecimiento}`);
  return data;
}

const deleteEstablishment = async(id_establecimiento) =>{
  const {data} = await axios.delete(API_URL+`/delete/${id_establecimiento}`)
  return data;
}

const updateEstablishment = async(establishment) =>{
  const {data} = await axios.patch(API_URL+`/update/${establishment.id_establecimiento}`, establishment)
  return data;
} */

export const attentionService = {
  createAttention,
  showAttention,
/*   showAttentionById,
  deleteEstablishment,
  updateEstablishment */
}

