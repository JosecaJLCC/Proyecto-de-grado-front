import axios from 'axios'

let API_URL = `${import.meta.env.VITE_API_URL}/api/v1/attention`

const createAttention = async(attention)=>{
  const {data} = await axios.post(API_URL+'/create', attention);
  return data;
}

const showAttention = async()=>{
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const showDiagnosis = async()=>{
  const {data} = await axios.get(API_URL+'/show-diagnosis');
  return data.data;
}

const showMedication = async()=>{
  const {data} = await axios.get(API_URL+'/show-medication');
  return data.data;
}

const updateAttention = async(id, attention)=>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, attention);
  return data;
}

const createMedicalDescription = async(id, attention)=>{
  const {data} = await axios.patch(API_URL+`/create-medical-description/${id}`, attention);
  return data;
}

const updateMedicalDescription = async(id, attention)=>{
  const {data} = await axios.patch(API_URL+`/update-medical-description/${id}`, attention);
  return data;
}

export const attentionService = {
  createAttention,
  showAttention,
  showDiagnosis,
  showMedication,
  updateAttention,
  updateMedicalDescription,
  createMedicalDescription
/*   diagnosticAttention */
}

