const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const fileUpload = require('express-fileupload')
const cors = require('cors')
require('dotenv').config()

const app = express()

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

app.post('/api', (req, res) => {
  res.send(req.body)
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
