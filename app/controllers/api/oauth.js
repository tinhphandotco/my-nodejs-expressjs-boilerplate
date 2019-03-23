const User = require('@models/users')

// services
const { tokens: tokensService } = require('@services/index')

const { jwtToken, randRefreshToken, pareJwtToken } = require('@root/utils/jwt')

module.exports = {
    login: (req, res) => {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && user.checkPassword(password)) {
                    const accessToken = jwtToken({
                        userId: user._id
                    })
                    const userDecoded = pareJwtToken(accessToken)
                    return tokensService.saveRefreshToken(randRefreshToken(), userDecoded).then(_ => {
                        res.sendData({
                            accessToken,
                            userId: user._id
                        })
                    })
                } else throw new Error('Email or password incorrect')
            })
            .catch(() => {
                res.sendError({
                    description: 'Email or password incorrect'
                }, 401)
            })
    }
}
