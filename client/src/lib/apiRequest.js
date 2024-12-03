import axios from 'axios'

const apiRequest = axios.create({
  baseURL: 'https://full-stack-estate-7zs3.onrender.com/api',
  withCredentials: true,
})

export default apiRequest
