import axios from 'axios';

const fCodeApi = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export default fCodeApi;