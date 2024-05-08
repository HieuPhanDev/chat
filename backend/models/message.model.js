const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    files: [],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Message', messageSchema)
