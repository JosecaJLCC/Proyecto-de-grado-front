import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/patient`

const createPatient = async(patient) =>{
  const {data} = await axios.post(API_URL+'/create', patient);
  return data;
}

const showPatient = async(estado_paciente) =>{
  const {data} = await axios.get(API_URL+`/show/${estado_paciente}`);
  return data.data;
}

const showFolder=async()=>{
  const {data} = await axios.get(API_URL+'/showfolder');
  return data.data;
}

const deletePatient = async(id) =>{
  const {data} = await axios.patch(API_URL+`/delete/${id}`)
  return data;
}

const updatePatient = async(id, patient) =>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, patient)
  return data;
}

const reactivatePatient = async(id) =>{
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`)
  return data;
}

const showHistoryPatient = async() =>{
  const {data} = await axios.get(API_URL+`/show-history`)
  return data.data;
}

export const patientService = {
  createPatient,
  showPatient,
  updatePatient,
  deletePatient,
  reactivatePatient,
  showFolder,
  showHistoryPatient
}
