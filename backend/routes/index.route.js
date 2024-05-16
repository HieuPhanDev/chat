const authRoutes = require('./auth.route.js')
const userRoutes = require('./user.route.js')
const ConversationRoutes = require('./conversation.route.js')
const MessageRoutes = require('./message.route.js')
const { notFound, errHandler } = require('../middlewares/errHandle')

const route = (app) => {
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use('/conversation', ConversationRoutes)
  app.use('/message', MessageRoutes)
  app.use(notFound)
  app.use(errHandler)
}

module.exports = route
