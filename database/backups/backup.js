'use strict'

require('module-alias/register')
require('dotenv').config('@root/.env')

const { DATABASE, PATH } = require('@root/config/index')
const moment = require('moment')
const shell = require('shelljs')

const run = async () => {
    try {
        let time = moment().format('DD-MM-YY-hh:mm')
        let filename = DATABASE.DATABASE_NAME + '_' + time
        await shell.exec(
            `bash ${PATH.ROOT}/database/backups/backup.sh ${DATABASE.DATABASE_NAME} ${time} ${filename}`
        )
    } catch (er) {
        console.log(er.message)
    }
}

run()
