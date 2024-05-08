const createHttpError = require('http-errors')
const User = require('../models/user.model')
module.exports.findUser = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw createHttpError.BadRequest('Please fill all fields.')
  return user
}

module.exports.searchUsers = async (keyword, userId) => {
  const users = await User.find({
    $or: [{ name: { $regex: keyword, $options: 'i' } }, { email: { $regex: keyword, $options: 'i' } }],
  }).find({
    _id: { $ne: userId },
  })
  return users
}
