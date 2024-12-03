import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const SinglePage = ({ post }) => {
  const { currentUser } = useContext(AuthContext)

  console.log('Current User:', currentUser)

  const handleSave = async () => {
    if (!currentUser) {
      console.error('User is not logged in')
      return
    }

    try {
      const response = await axios.post(
        '/api/users/save',
        {
          userId: currentUser.id, // Ensure you have the current user's ID
          postId: post.id, // Ensure you have the post ID
        },
        {
          withCredentials: true,
        }
      )

      console.log('Post saved:', response.data)
    } catch (error) {
      console.error('Error saving post:', error.response?.data?.message || error.message)
    }
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <button onClick={handleSave}>Save Post</button>
    </div>
  )
}

export default SinglePage
