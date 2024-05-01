const express = require('express')
const app = express()
require('dotenv').config()

app.get('/api', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
