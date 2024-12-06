import axios from 'axios'

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://full-stack-estate-7zs3.onrender.com/api',
  withCredentials: true,
})

export default apiRequest
