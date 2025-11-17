import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/microred'

const createMicrored = async(microred)=>{
  const {data} = await axios.post(API_URL+'/create', microred);
  return data;
}

const showMicrored = async(estado_microred)=>{
  const {data} = await axios.get(API_URL+`/show/${estado_microred}`);
  return data.data;
}

const deleteMicrored = async(id) =>{
  const {data} = await axios.patch(API_URL+`/delete/${id}`);
  return data;
}

const updateMicrored = async(id, microred) =>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, microred);
  return data;
}

const reactivateMicrored = async(id) =>{
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`);
  return data;
}

export const microredService = {
  createMicrored,
  showMicrored,
  deleteMicrored,
  updateMicrored,
  reactivateMicrored
}
