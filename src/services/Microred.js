import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/microred'

const createMicrored = async(microred)=>{
  const {data} = await axios.post(API_URL+'/create', microred);
  return data;
}

const showMicrored = async()=>{
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const showMicroredById = async(id_microred)=>{
  const {data} = await axios.get(API_URL+`/show/${id_microred}`);
  return data;
}

const deleteMicrored = async(id_microred) =>{
  const {data} = await axios.delete(API_URL+`/delete/${id_microred}`);
  return data;
}

const updateMicrored = async(microred) =>{
  const {data} = await axios.patch(API_URL+`/update/${microred.id_microred}`, microred);
  return data;
}
export const microredService = {
  createMicrored,
  showMicrored,
  showMicroredById,
  deleteMicrored,
  updateMicrored
}
