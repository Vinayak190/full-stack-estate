import axios from 'axios'

const apiRequest = axios.create({
  baseURL: 'https://full-stack-estate-7zs3.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/notification') && window.location.pathname !== '/login') {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiRequest
