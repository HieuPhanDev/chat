const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const createHttpError = require('http-errors')
const { Server } = require('socket.io')
const cookies = require('cookie-parser')

require('dotenv').config()

const routes = require('./routes/index.route')
const { default: mongoose } = require('mongoose')
const { SocketServer } = require('./SocketServer')

const app = express()

app.use(cookies())

mongoose.connect(process.env.DATABASE_URL, {}).then(() => {
  console.log('Connected to Mongodb.')
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(mongoSanitize())

app.use(compression())

app.use(fileUpload({ useTempFiles: true }))

app.use(
  cors({
    origin: 'https://hieu-chat-halo.onrender.com/',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true,
  })
)

app.use('/api/v1', routes)

app.use(async (req, res, next) => {
  next(createHttpError.NotFound('This route does not exist.'))
})

//error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 8000
let server

server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
})
io.on('connection', (socket) => {
  console.log('socket io connected successfully.')
  SocketServer(socket, io)
})

const exitHandler = () => {
  if (server) {
    console.log('Server closed.')
    process.exit(1)
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.log(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

//SIGTERM
process.on('SIGTERM', () => {
  if (server) {
    console.log('Server closed.')
    process.exit(1)
  }
})
