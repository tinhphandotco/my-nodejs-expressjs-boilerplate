const router = require('express').Router()

// controllers
const oauth = require('@controllers/api/oauth')

// middleware
const { jwtAuth } = require('@middleware/index')

router.post('/token', jwtAuth({ ignoreExpiration: true }), oauth.getAccessToken) // get accessToken by refreshToken
router.post('/login', oauth.login)

module.exports = router
