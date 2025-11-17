import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/patient'

const showPatient = async() =>{
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const createPatient = async(patient) =>{
  const {data} = await axios.post(API_URL+'/create', patient);
  return data;
}

const showPatientById = async() =>{
  const data = await axios.get(API_URL+'/show/:id');
  return data;
}

const showFolder=async()=>{
  const {data} = await axios.get(API_URL+'/showfolder');
  return data.data;
}

const deletePatient = async(id_paciente) =>{
  const {data} = await axios.delete(API_URL+`/delete/${id_paciente}`)
  return data;
}

const updatePatient = async(patient) =>{
  const {data} = await axios.patch(API_URL+`/update/${patient.id_paciente}`, patient)
  return data;
}

export const patientService = {
  showPatient,
  createPatient,
  showPatientById,
  showFolder,
  updatePatient,
  deletePatient
}
