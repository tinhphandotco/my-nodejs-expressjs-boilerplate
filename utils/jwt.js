const jwt = require('jsonwebtoken')
const uid = require('rand-token').uid

const { JWT } = require('@root/config/index')

const randRefreshToken = (len = 45) => uid(len)

const jwtToken = (data = {}) => {
    return jwt.sign(data, JWT.JWT_ENCRYPTION, { expiresIn: JWT.JWT_EXPIRATION })
}

const pareJwtToken = (token) => {
    return jwt.verify(token, JWT.JWT_ENCRYPTION)
}

module.exports = {
    jwtToken,
    pareJwtToken,
    randRefreshToken
}
