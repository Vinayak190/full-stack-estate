import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import './adminDashboard.scss'

const AdminDashboard = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await apiRequest.get('/admin/posts')
      setPosts(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login')
      } else {
        setError(err.response?.data?.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      await apiRequest.delete(`/admin/posts/${id}`)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/admin/login')
      } else {
        setError(err.response?.data?.message || 'Failed to delete post')
      }
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="adminDashboard">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <Link to="/" className="backButton">
          Back to Home
        </Link>
      </div>
      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>City</th>
                <th>Posted By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>${post.price}</td>
                  <td>{post.city}</td>
                  <td>{post.user?.username}</td>
                  <td>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
