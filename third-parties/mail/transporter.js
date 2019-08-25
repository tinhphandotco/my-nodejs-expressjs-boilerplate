const nodemailer = require('nodemailer')
const { MAIL } = require('@config/index')
const { FORGOT_PASSWORD } = require('./types')
const { geForgotPasswordOption } = require('./options')

const transporterConfig = {
    host: MAIL.HOST,
    port: MAIL.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: MAIL.USERNAME, // generated ethereal user
        pass: MAIL.PASSWORD // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(transporterConfig)

module.exports = (type) => {
    return {
        sendMail: (data) => {
            switch (type) {
            case FORGOT_PASSWORD: return transporter.sendMail(geForgotPasswordOption(data))
            default: throw new Error(`We have not support ${type} mail form`)
            }
        }
    }
}
