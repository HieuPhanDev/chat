const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide tour email address'],
      unqiue: [true, 'This email address already exist'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    picture: {
      type: String,
      default: 'https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png',
    },
    status: {
      type: String,
      default: 'Chat with Hiếu',
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minLength: [6, 'Plase make sure your password is atleast 6 characters long'],
      maxLength: [128, 'Plase make sure your password is less than 128 characters long'],
    },
  },
  {
    timestamps: true,
  }
)
userSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})
module.exports = mongoose.model('User', userSchema)
