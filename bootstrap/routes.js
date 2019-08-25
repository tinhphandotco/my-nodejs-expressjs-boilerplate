// const config = require('@config/index')

module.exports = (app) => Promise.resolve(
    require('@routes/express')(app)
)
