const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Conversations name is required.'],
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

//Export the model
module.exports = mongoose.model('Conversation', conversationSchema)
