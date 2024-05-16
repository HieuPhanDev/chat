const { default: mongoose } = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Connected successfully!')
  } catch (error) {
    handleError(error)
  }
}
module.exports = connectDB
