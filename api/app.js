import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import testRoute from './routes/test.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import messageRoute from './routes/message.route.js'
import adminRoute from './routes/admin.route.js'

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://full-stack-estate.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    return
  }
  next()
})

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const oldCookie = res.cookie
  res.cookie = function (name, value, options = {}) {
    return oldCookie.call(this, name, value, {
      ...options,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
  }
  next()
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/test', testRoute)
app.use('/api/chats', chatRoute)
app.use('/api/messages', messageRoute)
app.use('/api/admin', adminRoute)

app.listen(8800, () => {
  console.log('Server is running!')
})
