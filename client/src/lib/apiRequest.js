import axios from 'axios'

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://full-stack-estate-7zs3.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor to handle 401 errors
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401s for non-notification endpoints
    if (error.response?.status === 401 && !error.config.url.includes('/notification') && window.location.pathname !== '/login') {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiRequest
