// const config = require('@root/config/index')

module.exports = (app) => Promise.resolve(
    require('@root/routes/express')(app)
)
