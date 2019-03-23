const User = require('@models/users')
const { REQUEST_STATUSES } = require('@root/constants/index')

// services
const { tokens: tokensService } = require('@services/index')

const { jwtToken, randRefreshToken, pareJwtToken } = require('@root/utils/jwt')

module.exports = {
    login: (req, res) => {
        const errors = [{ description: 'Email or password incorrect' }]
        const { FORBIDDEND } = REQUEST_STATUSES

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
                } else throw new Error()
            })
            .catch(() => {
                res.sendError(errors, FORBIDDEND)
            })
    },

    getAccessToken: (req, res) => {
        const errors = [{ description: 'Can not get access token' }]
        const { LOW_AUTHORIZED } = REQUEST_STATUSES

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
            .catch(err => res.sendError(
                err ? [{ description: err.message }] : errors, LOW_AUTHORIZED)
            )
    }
}
