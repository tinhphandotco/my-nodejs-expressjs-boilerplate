const Token = require('@models/tokens')

module.exports = {
    getRefreshToken: (userId) => {

    },
    saveRefreshToken: (refreshToken, userDecoded) => {
        return Token.findOne({ user: userDecoded.userId }).then(token => {
            if (token) {
                token.refreshToken = refreshToken
                token.expires = new Date(userDecoded.exp * 1000)
                return token.save()
            } else {
                const token = new Token({
                    user: userDecoded.userId,
                    refreshToken,
                    expires: new Date(userDecoded.exp * 1000)
                })
                return token.save()
            }
        })
    }
}
