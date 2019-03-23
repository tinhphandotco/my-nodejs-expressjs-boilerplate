const { pareJwtToken } = require('@root/utils/jwt')
const usersService = require('@services/users')
const { JWT } = require('@root/config/index')
const { REQUEST_STATUSES } = require('@root/constants/index')

module.exports = (pareJwtTokenOptions) => (req, res, next) => {
    const errors = [{ description: 'Unauthorized user!' }]
    const { UNAUTHORIZED } = REQUEST_STATUSES
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === JWT.JWT_TOKEN_PREFIX) {
        const accessToken = req.headers.authorization.split(' ')[1]
        try {
            const userDecoded = pareJwtToken(accessToken, { ignoreExpiration: pareJwtTokenOptions.ignoreExpiration || false })
            if (userDecoded) {
                usersService.getUserById(userDecoded.userId)
                    .then(user => {
                        req.userAuth = user.toJSON()
                        next()
                    })
                    .catch(_ => {
                        res.sendError(errors, UNAUTHORIZED)
                    })
            } else {
                res.sendError(errors, UNAUTHORIZED)
            }
        } catch (_) {
            res.sendError(errors, UNAUTHORIZED)
        }
    } else {
        res.sendError(errors, UNAUTHORIZED)
    }
}
