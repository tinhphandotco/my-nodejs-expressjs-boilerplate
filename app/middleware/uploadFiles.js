const multer = require('multer')
const path = require('path')
const PATH = require('@config/path')

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(PATH.ROOT, 'storage/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + new Date().getTime().toString() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

module.exports = upload
