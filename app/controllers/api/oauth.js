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
                    return tokensService.saveRefreshToken(randRefreshToken(), userDecoded).then(token => {
                        res.sendData({
                            accessToken,
                            refreshToken: token.refreshToken,
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
    },

    getAccessToken: (req, res) => {
        const { refreshToken } = req.body
        const { _id: userId } = req.userAuth

        tokensService.getRefreshToken({ userId, refreshToken })
            .then(_ => {
                const newAccessToken = jwtToken({ userId })
                const userDecoded = pareJwtToken(newAccessToken)
                return tokensService.saveRefreshToken(randRefreshToken(), userDecoded).then(token => {
                    res.sendData({
                        accessToken: newAccessToken,
                        refreshToken: token.refreshToken,
                        userId: userId
                    })
                })
            })
            .catch(err => res.sendError({ description: err ? err.message : 'get accessToken failed' }, 401))
    }
}
