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

const showStaffById = async(id_personal)=>{
  const {data} = await axios.get(API_URL+`/show/${id_personal}`);
  return data;
}

const deleteStaff = async(id_personal) =>{
  const {data} = await axios.delete(API_URL+`/delete/${id_personal}`)
  return data;
}

const updateStaff = async(staff) =>{
  const {data} = await axios.patch(API_URL+`/update/${Staff.id_personal}`, staff)
  return data;
}

export const staffService = {
  createStaff,
  showStaff,
  showStaffById,
  deleteStaff,
  updateStaff
}

