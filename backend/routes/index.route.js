const express = require('express')
const authRoutes = require('./auth.route.js')
const userRoutes = require('./user.route.js')
const ConversationRoutes = require('./conversation.route.js')
const MessageRoutes = require('./message.route.js')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/conversation', ConversationRoutes)
router.use('/message', MessageRoutes)

module.exports = router
