import axios from 'axios'

let API_URL = `${import.meta.env.VITE_API_URL}/api/v1/staff`

const createStaff = async(staff)=>{
  const {data} = await axios.post(API_URL+'/create', staff);
  return data;
}

const showStaff = async(estado_personal)=>{
  const {data} = await axios.get(API_URL+`/show/${estado_personal}`);
  return data.data;
}

const deleteStaff = async(id, id_usuario_rol) =>{
  const {data} = await axios.patch(API_URL+`/delete/${id}`, id_usuario_rol)
  return data;
}

const updateStaff = async(id, staff) =>{
  const {data} = await axios.patch(API_URL+`/update/${id}`, staff)
  return data;
}

const reactivateStaff = async(id, id_usuario_rol) =>{
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`, id_usuario_rol)
  return data;
}

const showProfession = async()=>{
  const {data} = await axios.get(API_URL+'/show-profession');
  return data.data;
}

const showWorkArea = async()=>{
  const {data} = await axios.get(API_URL+'/show-workarea');
  return data.data;
}

const showPosition = async()=>{
  const {data} = await axios.get(API_URL+'/show-position');
  return data.data;
}

export const staffService = {
  createStaff,
  showStaff,
  deleteStaff,
  updateStaff,
  reactivateStaff,
  showProfession,
  showWorkArea,
  showPosition
}

