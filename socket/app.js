// import { Server } from 'socket.io'

// const io = new Server({
//   cors: {
//     origin: 'http://localhost:5173',
//   },
// })

// let onlineUser = []

// const addUser = (userId, socketId) => {
//   const userExits = onlineUser.find((user) => user.userId === userId)
//   if (!userExits) {
//     onlineUser.push({ userId, socketId })
//   }
// }

// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
// }

// const getUser = (userId) => {
//   return onlineUser.find((user) => user.userId === userId)
// }

// io.on('connection', (socket) => {
//   socket.on('newUser', (userId) => {
//     addUser(userId, socket.id)
//   })

//   socket.on('sendMessage', ({ receiverId, data }) => {
//     const receiver = getUser(receiverId)
//     io.to(receiver.socketId).emit('getMessage', data)
//   })

//   socket.on('disconnect', () => {
//     removeUser(socket.id)
//   })
// })

// io.listen('4000')

import { Server } from 'socket.io'

const io = new Server({
  cors: {
    origin: 'https://full-stack-estate-7zs3.onrender.com',
  },
})

let onlineUser = []

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId)
  if (!userExits) {
    onlineUser.push({ userId, socketId })
  }
}

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  console.log('New connection:', socket.id)

  socket.on('newUser', (userId) => {
    addUser(userId, socket.id)
    // Optionally emit the updated online users list
    io.emit('onlineUsers', onlineUser)
    console.log('Online users:', onlineUser)
  })

  socket.on('sendMessage', ({ receiverId, data }) => {
    const receiver = getUser(receiverId)

    if (!receiver) {
      // Handle case when receiver is not online
      socket.emit('messageError', {
        error: 'User is offline',
        receiverId,
        data,
      })
      return
    }

    try {
      io.to(receiver.socketId).emit('getMessage', data)
    } catch (error) {
      console.error('Error sending message:', error)
      socket.emit('messageError', {
        error: 'Failed to send message',
        receiverId,
        data,
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    removeUser(socket.id)
    // Emit updated online users list after removal
    io.emit('onlineUsers', onlineUser)
  })
})

io.listen('4000')
