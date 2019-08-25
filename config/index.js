require('dotenv').config('@.env')

module.exports = {
    APP: require('./app'),
    AUTH: require('./auth'),
    CORS: require('./cors'),
    DATABASE: require('./database'),
    ENV: require('./env'),
    JWT: require('./jwt'),
    MAIL: require('./mail'),
    PATH: require('./path'),
    SESSION: require('./session'),
    SOCKET: require('./socket'),
    VIEW: require('./view')
}
