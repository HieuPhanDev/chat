const createHttpError = require('http-errors')
const Conversation = require('../models/conversation.model.js')
const User = require('../models/user.model.js')

module.exports.doesConversationExist = async (sender_id, receiver_id, isGroup) => {
  if (isGroup === false) {
    let convos = await Conversation.find({
      isGroup: false,
      $and: [{ users: { $elemMatch: { $eq: sender_id } } }, { users: { $elemMatch: { $eq: receiver_id } } }],
    })
      .populate('users', '-password')
      .populate('latestMessage')

    if (!convos) throw createHttpError.BadRequest('Oops...Something went wrong !')

    //populate message model
    convos = await User.populate(convos, {
      path: 'latestMessage.sender',
      select: 'name email picture status',
    })

    return convos[0]
  } else {
    //it's a group chat
    let convo = await Conversation.findById(isGroup).populate('users admin', '-password').populate('latestMessage')

    if (!convo) throw createHttpError.BadRequest('Oops...Something went wrong !')
    //populate message model
    convo = await User.populate(convo, {
      path: 'latestMessage.sender',
      select: 'name email picture status',
    })

    return convo
  }
}

module.exports.createConversation = async (data) => {
  const newConvo = await Conversation.create(data)
  if (!newConvo) throw createHttpError.BadRequest('Oops...Something went wrong !')
  return newConvo
}

module.exports.populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
  const populatedConvo = await Conversation.findOne({ _id: id }).populate(fieldToPopulate, fieldsToRemove)
  if (!populatedConvo) throw createHttpError.BadRequest('Oops...Something went wrong !')
  return populatedConvo
}
module.exports.getUserConversations = async (user_id) => {
  let conversations
  await Conversation.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate('users', '-password')
    .populate('admin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, {
        path: 'latestMessage.sender',
        select: 'name email picture status',
      })
      conversations = results
    })
    .catch((err) => {
      throw createHttpError.BadRequest('Oops...Something went wrong !')
    })
  return conversations
}

module.exports.updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await Conversation.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  })
  if (!updatedConvo) throw createHttpError.BadRequest('Oops...Something went wrong !')

  return updatedConvo
}
