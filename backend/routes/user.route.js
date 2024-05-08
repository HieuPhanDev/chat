const express = require('express')
const trimRequest = require('trim-request')
const { searchUsers } = require('../controllers/user.controller.js')
const { authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/').get(trimRequest.all, authMiddleware, searchUsers)

module.exports = router
