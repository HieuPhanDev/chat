const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const cookies = require('cookie-parser')

require('dotenv').config()

const { SocketServer } = require('./SocketServer')
const connectDB = require('./utils/db')
const routes = require('./routes/index.route')

const app = express()
connectDB()

app.use(
  cors({
    origin: true, // Cho phép tất cả các nguồn gốc
    credentials: true, // Cho phép gửi cookie qua CORS
  })
)

app.use(cookies())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000
let server

routes(app)

server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ['http://localhost:3000', 'https://hieu-chat-halo.onrender.com', 'https://chat-theta-taupe.vercel.app/'],
    credentials: true,
  },
})
io.on('connection', (socket) => {
  console.log('socket io connected successfully.')
  SocketServer(socket, io)
})
