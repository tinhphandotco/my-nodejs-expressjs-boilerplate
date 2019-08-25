const User = require('@models/users')
const { REQUEST_STATUSES: { FORBIDDEND, LOW_AUTHORIZED } } = require('@constants/index')

// services
const { tokens: tokensService } = require('@services/index')

const { jwtToken, randRefreshToken, pareJwtToken } = require('@utils/jwt')
const { sendData, sendError } = require('@utils/responses')

module.exports = {
    login: (req, res) => {
        const errors = [{ description: 'Email or password incorrect' }]

        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && user.checkPassword(password)) {
                    const accessToken = jwtToken({
                        userId: user._id
                    })
                    const userDecoded = pareJwtToken(accessToken)
                    return tokensService.saveRefreshToken(randRefreshToken(), userDecoded).then(token => {
                        sendData(res, {
                            data: {
                                accessToken,
                                refreshToken: token.refreshToken,
                                userId: user._id
                            }
                        })
                    })
                } else throw new Error()
            })
            .catch(() => {
                sendError(res, {
                    errors,
                    status: FORBIDDEND
                })
            })
    },

    getAccessToken: (req, res) => {
        const errors = [{ description: 'Can not get access token' }]
        const { refreshToken } = req.body
        const { _id: userId } = req.userAuth

        tokensService.getRefreshToken({ userId, refreshToken })
            .then(_ => {
                const newAccessToken = jwtToken({ userId })
                const userDecoded = pareJwtToken(newAccessToken)
                return tokensService.saveRefreshToken(randRefreshToken(), userDecoded).then(token => {
                    sendData(res, {
                        data: {
                            accessToken: newAccessToken,
                            refreshToken: token.refreshToken,
                            userId: userId
                        }
                    })
                })
            })
            .catch(err => sendError(res, {
                errors: err ? [{ description: err.message }] : errors,
                status: LOW_AUTHORIZED
            }))
    }
}
