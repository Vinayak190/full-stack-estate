import { createContext, useEffect, useState } from 'react'
import apiRequest from '../lib/apiRequest'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const updateUser = (data) => {
    setCurrentUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const clearUser = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    if (currentUser) {
      // Verify token validity
      apiRequest.get('/auth/verify').catch(() => {
        clearUser()
      })
    }
  }, [])

  return <AuthContext.Provider value={{ currentUser, updateUser, clearUser }}>{children}</AuthContext.Provider>
}
