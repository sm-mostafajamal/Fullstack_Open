/* eslint-disable import/no-anonymous-default-export */
const axios = require('axios');
const loginUrl = 'http://localhost:3003/api/login';
const baseUrl = 'http://localhost:3003/api/blogs';

const login = async (credentials) => {
  const res = await axios.post(loginUrl, credentials);
  return res.data
};

const getAll = async () => {
  // const req = axios.get(baseUrl) 
  // return req.then(res => res.data)
  const res = await axios.get(baseUrl) 
  return res.data
}


export default { login, getAll };