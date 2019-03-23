const router = require('express').Router()

router.get('/', (req, res) => {
    res.sendData({ message: 'this is first api endpoint' })
})

module.exports = router
