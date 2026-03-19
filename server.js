const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const postRouter = require('./routes/posts')
const authRouter = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pencraftblog.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`👉 ${req.method} ${req.url}`)
  next()
})

mongoose.connect('mongodb://127.0.0.1:27017/blogApp')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB connection error", err))

app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)

app.use((req, res) => {
  console.log(`❌ No route found for: ${req.method} ${req.url}`)
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})