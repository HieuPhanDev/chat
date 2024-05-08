const { sign, verify } = require('../utils/token.util.js')

module.exports.generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret)
  return token
}

module.exports.verifyToken = async (token, secret) => {
  let check = await verify(token, secret)
  return check
}
