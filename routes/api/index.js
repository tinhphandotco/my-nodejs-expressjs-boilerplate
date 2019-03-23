const router = require('express').Router()
const oauthRoute = require('./oauth')

router.use('/oauth', oauthRoute)

router.get('/', (req, res) => {
    res.sendData({ message: 'This is first api endpoint' })
})

module.exports = router
