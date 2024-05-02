const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const createHttpError = require('http-errors')

require('dotenv').config()

const logger = require('./configs/logger.config')
const routes = require('./routes/index.route')
const { default: mongoose } = require('mongoose')

const app = express()

mongoose.connection.on('error', (err) => {
  logger.error(`Mongodb connection error : ${err}`)
  process.exit(1)
})
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}
mongoose.connect(process.env.DATABASE_URL, {}).then(() => {
  logger.info('Connected to Mongodb.')
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

app.use(cors())

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
  logger.info(`Example app listening on port ${PORT}`)
})

const exitHandler = () => {
  if (server) {
    logger.info('Server closed.')
    process.exit(1)
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

//SIGTERM
process.on('SIGTERM', () => {
  if (server) {
    logger.info('Server closed.')
    process.exit(1)
  }
})
