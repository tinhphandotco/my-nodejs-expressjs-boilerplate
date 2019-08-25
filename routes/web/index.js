const router = require('express').Router()
const { render } = require('@utils/responses')

router.get('/', (req, res) => {
    render(res, {
        view: 'app/web/home/index'
    })
})

module.exports = router
