import axios from 'axios';

const fCodeApi = axios.create({
  baseURL: '/api'
});

export default fCodeApi;