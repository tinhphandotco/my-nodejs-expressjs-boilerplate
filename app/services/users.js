const User = require('@models/users')

module.exports = {
    getUserById: (userId) => {
        return User.findById(userId).then(user => user || Promise.reject(new Error('user not found')))
    }
}
