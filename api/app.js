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

const allowedOrigins = ['http://localhost:5173', 'https://full-stack-estate.vercel.app']

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
)
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.cookie = res.cookie.bind(res)
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
