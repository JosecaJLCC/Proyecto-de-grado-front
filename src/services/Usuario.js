import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/user';

const createUser = async(user) => {
  const {data} = await axios.post(API_URL+'/create', user);
  return data.data;
}

const showUser = async() => {
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const deleteUser = async(id) => {
  const {data} = await axios.delete(API_URL+`/delete/${id}`)
  return data;
}

const updateUser = async(id) => {
  const {data} = await axios.patch(API_URL+`/delete/${id}`)
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

export const userService = {
  createUser,
  showUser,
  updateUser,
  deleteUser,
  profileUser,
  login,
  chooseEstablishment,
  setSession,
  searchUser
}
