const router = require('express').Router()

// controllers

// middleware
const { uploadFiles } = require('@middleware/index')

router.post('/upload', uploadFiles.fields([
    { name: 'photos', maxCount: 5 }
]), (req, res) => {
    res.sendData(req.files)
})

module.exports = router
