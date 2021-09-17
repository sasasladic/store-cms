import axios from 'axios';
 
let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers
});
 
export default api;