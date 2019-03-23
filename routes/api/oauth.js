const router = require('express').Router()

// controllers
const oauth = require('@controllers/api/oauth')

// router.all('/token', )
router.post('/login', oauth.login)

module.exports = router
