module.exports.register = async (req, res, next) => {
  try {
    res.send(req.body)
  } catch (error) {
    next(error)
  }
}
module.exports.login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
module.exports.logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
module.exports.refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
