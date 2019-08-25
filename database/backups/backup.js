'use strict'

require('module-alias/register')
require('dotenv').config('@.env')

const { DATABASE, PATH } = require('@config/index')
const moment = require('moment')
const shell = require('shelljs')

const run = async () => {
    try {
        let time = moment().format('DD-MM-YY-HH:mm')
        let filename = DATABASE.DATABASE_NAME + '_' + time
        await shell.exec(
            `bash ${PATH.ROOT}/database/backups/backup.sh ${DATABASE.DATABASE_URL} ${filename}`
        )
    } catch (err) {
    }
}

run()
