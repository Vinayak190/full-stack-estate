import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import './adminLogin.scss'

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await apiRequest.post('/admin/login', inputs)
      if (res.data) {
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adminLogin">
      <div className="card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name="username" onChange={handleChange} disabled={loading} />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} disabled={loading} />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <Link to="/" className="backButton">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default AdminLogin
