import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/staff'

const createStaff = async(staff)=>{
  const {data} = await axios.post(API_URL+'/create', staff);
  return data;
}

const showStaff = async()=>{
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const deleteStaff = async(id_personal) =>{
  const {data} = await axios.delete(API_URL+`/delete/${id_personal}`)
  return data;
}

const updateStaff = async(staff) =>{
  const {data} = await axios.patch(API_URL+`/update/${staff.id_personal}`, staff)
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
  showProfession,
  showWorkArea,
  showPosition
}

