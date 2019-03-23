const router = require('express').Router()
const oauthRoute = require('./oauth')

router.use('/oauth', oauthRoute)

router.get('/', (req, res) => {
    res.sendData({ message: 'this is first api endpoint' })
})

module.exports = router
