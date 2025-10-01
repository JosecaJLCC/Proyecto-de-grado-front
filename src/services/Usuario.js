import axios from 'axios'

let API_URL = 'http://localhost:3000/api/v1/user';

const showUser = async() => {
  const {data} = await axios.get(API_URL+'/show');
  return data.data;
}

const createUser = async(user) => {
  const {data} = await axios.post(API_URL+'/create', user);
  return data.data;
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

const chooseEstablishment = async(id_usuario) => {
  const {data} = await axios.get(API_URL+`/choose/${id_usuario}`)
  return data.data;
}

const setSession = async(user) => {
  const {data} = await axios.post(API_URL+`/session`, user)
  return data;
}

const deleteUser = async(id_usuario) => {
  const {data} = await axios.post(API_URL+`/delete/${id_usuario}`)
  return data;
}


export const userService = {
  createUser,
  showUser,
  profileUser,
  login,
  chooseEstablishment,
  setSession
}
