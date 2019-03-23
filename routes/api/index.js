const router = require('express').Router()
const oauthRoute = require('./oauth')
const testRoute = require('./test')

router.use('/oauth', oauthRoute)

router.use('/test', testRoute)

module.exports = router
