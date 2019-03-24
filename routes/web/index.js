const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('app/web/home/index')
})

module.exports = router
