import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from './AuthContext'

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      const newSocket = io('https://full-stack-estate-7zs3.onrender.com')
      setSocket(newSocket)

      return () => {
        if (newSocket) {
          newSocket.disconnect()
        }
      }
    } else {
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [currentUser])

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
