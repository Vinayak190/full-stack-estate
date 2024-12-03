import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RequireAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await axios.get('/api/admin/verify', {
          withCredentials: true,
        })
        setLoading(false)
      } catch (err) {
        navigate('/admin/login')
      }
    }
    verifyAdmin()
  }, [navigate])

  if (loading) {
    return <div>Loading...</div>
  }

  return children
}

export default RequireAdmin
