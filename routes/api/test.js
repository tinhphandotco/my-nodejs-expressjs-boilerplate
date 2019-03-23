const router = require('express').Router()

// controllers

// middleware
const { uploadFiles } = require('@middleware/index')
const { transporter, TYPES: MAIL_TYPES } = require('@root/third-parties/mail/index')

router.post('/upload', uploadFiles.fields([
    { name: 'photos', maxCount: 5 }
]), (req, res) => {
    res.sendData(req.files)
})

router.get('/send-mail', (req, res) => {
    transporter(MAIL_TYPES.FORGOT_PASSWORD).sendMail({
        name: 'asdf',
        email: 'pvtinh1996@gmail.com',
        token: 'asdfasdf',
        appOrigin: 'http://localhost:3001'
    })
})

module.exports = router
