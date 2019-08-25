const bcrypt = require('bcryptjs')
const config = require('@config/index')

const dfPass = bcrypt.hashSync('123123', config.AUTH.HASH_PASSWORD)

module.exports = [
    {
        email: 'root@tpvhub.com',
        username: 'root',
        password: dfPass,
        role: 'ADMIN'
    }
]
