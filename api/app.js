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
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', 'https://full-stack-estate.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'https://full-stack-estate.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

app.use((req, res, next) => {
  const oldCookie = res.cookie
  res.cookie = function (name, value, options = {}) {
    return oldCookie.call(this, name, value, {
      ...options,
      secure: true,
      sameSite: 'none',
      path: '/',
      domain: '.onrender.com',
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
