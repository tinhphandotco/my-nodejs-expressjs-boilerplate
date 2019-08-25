'use strict'

require('module-alias/register')
require('dotenv').config('@.env')

const fs = require('fs')
const { DATABASE, PATH } = require('@config/index')
const shell = require('shelljs')

const run = async () => {
    try {
        let dbFolder = `${PATH.ROOT}/database/backups/db-backups/${DATABASE.DATABASE_NAME}`
        if (fs.existsSync(dbFolder)) {
            await shell.exec(
                `bash ${PATH.ROOT}/database/backups/restore.sh ${DATABASE.DATABASE_URL} ${dbFolder} ${DATABASE.DATABASE_NAME}`
            )
        } else throw new Error('db-backup not exists')
    } catch (er) {
        console.log(er.message)
    }
}

run()
