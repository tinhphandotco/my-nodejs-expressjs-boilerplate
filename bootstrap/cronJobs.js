const { ENV } = require('@config/index')
module.exports = (cronJobs) => new Promise((resolve, reject) => {
    try {
        if (ENV.NODE_ENV === 'production') {
            Object.values(cronJobs).map(job => job().start())
            resolve(cronJobs)
        } else resolve(null)
    } catch (err) {
        reject(err)
    }
})
