const { pareJwtToken } = require('@root/utils/jwt')
const usersService = require('@services/users')
const { JWT } = require('@root/config/index')

module.exports = (pareJwtTokenOptions) => (req, res, next) => {
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
                        res.sendError({ description: 'Unauthorized user!' }, 401)
                    })
            } else {
                res.sendError({ description: 'Unauthorized user!' }, 401)
            }
        } catch (_) {
            res.sendError({ description: 'Unauthorized user!' }, 401)
        }
    } else {
        res.sendError({ description: 'Unauthorized user!' }, 401)
    }
}
