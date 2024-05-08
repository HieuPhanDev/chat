const Message = require('../models/message.model')
const createHttpError = require('http-errors')
module.exports.createMessage = async (data) => {
  let newMessage = await Message.create(data)
  if (!newMessage) throw createHttpError.BadRequest('Oops...Something went wrong !')
  return newMessage
}

module.exports.populateMessage = async (id) => {
  let msg = await Message.findById(id)
    .populate({
      path: 'sender',
      select: 'name picture',
      model: 'User',
    })
    .populate({
      path: 'conversation',
      select: 'name picture isGroup users',
      model: 'Conversation',
      populate: {
        path: 'users',
        select: 'name email picture status',
        model: 'User',
      },
    })
  if (!msg) throw createHttpError.BadRequest('Oops...Something went wrong !')
  return msg
}

module.exports.getConvoMessages = async (convo_id) => {
  const messages = await Message.find({ conversation: convo_id })
    .populate('sender', 'name picture email status')
    .populate('conversation')
  if (!messages) {
    throw createHttpError.BadRequest('Oops...Something went wrong !')
  }
  return messages
}
