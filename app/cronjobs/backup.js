const CronJob = require('cron').CronJob
const shell = require('shelljs')

const stopJob = (job) => job.stop()
const startJob = (job) => job.start()

module.exports = () => {
    const times = ['00 59 23 * * *']
    const jobs = times.map(cronTime => {
        return new CronJob({
            cronTime,
            onTick: async () => {
                console.log('Job backup DB is running...')
                try {
                    await shell.exec('yarn db:backup')
                } catch (er) {
                    console.log('Job backup DB has error', er.message)
                }
                console.log('Job backup DB finished')
            },
            start: true
            // timeZone: 'Asia/Ho_Chi_Minh'
        })
    })

    return {
        start: () => {
            jobs.forEach(startJob)
        },
        stop: () => {
            jobs.forEach(stopJob)
        }
    }
}
