const createHttpError = require('http-errors')
const { searchUsers: searchUsersService } = require('../services/user.service.js')
module.exports.searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search
    if (!keyword) {
      console.log('Please add a search query first')
      throw createHttpError.BadRequest('Oops...Something went wrong !')
    }
    const users = await searchUsersService(keyword, req.user.userId)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
