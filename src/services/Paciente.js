import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/patient'

const mostrarPaciente = async() =>{
  const data = await axios.get(API_URL+'/show');
  return data;
}

const registrarPaciente = async(paciente) =>{
  const data = await axios.get(API_URL+'/register', paciente);
  return data;
}

const mostrarPacienteByCi = async() =>{
  const data = await axios.get(API_URL+'/show/:id');
  return data;
}

export const pacienteService = {
  mostrarPaciente,
  registrarPaciente,
  mostrarPacienteByCi
}
