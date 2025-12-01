import axios from 'axios'

let API_URL = `${import.meta.env.VITE_API_URL}/api/v1/user`;

const createUser = async(user) => {
  const {data} = await axios.post(API_URL+'/create', user);
  return data;
}

const showUser = async(estado_usuario) => {
  const {data} = await axios.get(API_URL+`/show/${estado_usuario}`);
  return data.data;
}

const updateUser = async(id, user) => {
  const {data} = await axios.patch(API_URL+`/update/${id}`, user)
  return data;
}

const deleteUser = async(id) => {
  const {data} = await axios.patch(API_URL+`/delete/${id}`)
  return data;
}

const reactivateUser = async(id) => {
  const {data} = await axios.patch(API_URL+`/reactivate/${id}`)
  return data;
}

const login = async(user) => {
  const {data} = await axios.post(API_URL+'/login', user);
  return data;
}

const profileUser = async(token) => {
  const {data} = await axios.get(API_URL+'/profile', {
     headers: { Authorization: `Bearer ${token}` }
  })
  return data.data;
}

const chooseEstablishment = async(id) => {
  const {data} = await axios.get(API_URL+`/choose/${id}`)
  return data.data;
}

const setSession = async(user) => {
  const {data} = await axios.post(API_URL+`/session`, user)
  return data;
}

const searchUser = async(ci) => {
  const {data} = await axios.get(API_URL+`/search/${ci}`, )
  return data;
}

const showUserAuthors= async(id) => {
  const {data} = await axios.get(API_URL+`/author/${id}`, )
  return data.data;
}

export const userService = {
  createUser,
  showUser,
  updateUser,
  deleteUser,
  reactivateUser,
  profileUser,
  login,
  chooseEstablishment,
  setSession,
  searchUser,
  showUserAuthors
}
