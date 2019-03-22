const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'connect to api'
    })
})

module.exports = router
