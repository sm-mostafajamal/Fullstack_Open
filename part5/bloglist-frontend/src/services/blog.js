/* eslint-disable import/no-anonymous-default-export */
const axios = require('axios');
const loginUrl = 'http://localhost:3003/api/login';
const baseUrl = 'http://localhost:3003/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const login = async credentials => {
  const res = await axios.post(loginUrl, credentials);
  return res.data
};

const getAll = async () => {
  // const req = axios.get(baseUrl) 
  // return req.then(res => res.data)
  const res = await axios.get(baseUrl) 
  return res.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization : token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id, newObject) => {
  const req = await axios.put(`${baseUrl}/${id}`, newObject)
  return req.data
}

export default { login, getAll, create, update, setToken };