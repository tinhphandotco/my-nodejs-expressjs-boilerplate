'use strict'

require('module-alias/register')

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('@config/index')
const { composePromise } = require('@utils/common')
const { models: bootstrapModels } = require('@bootstrap/index')

console.log(config.DATABASE.DATABASE_URL)

const getDataSeed = model => {
    const pathSeed = path.resolve(
        config.PATH.ROOT,
        'database/seeds',
        model.collection.collectionName
    )

    return fs.existsSync(pathSeed + '.js') ? require(pathSeed) : []
}

const connectDatabase = (url = config.DATABASE.DATABASE_URL) => new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', (err) => reject(new Error(`MongoDb connection error: ${err.message}`)))
    db.once('open', resolve)
})

const cleanDB = (model) => new Promise((resolve, reject) =>
    model.deleteMany({})
        .then(_ => model.collection.drop())
        .then(_ => resolve(model))
        .catch(_ => resolve(model))
)
const cleanDBs = (models) => Promise.all(models.map(cleanDB))
const migrateDB = (model) => model.insertMany(getDataSeed(model))
const migrateDBs = (models) => Promise.all(models.map(migrateDB))

composePromise(
    _ => { console.log('Database refresh'); process.exit(0) },
    migrateDBs,
    cleanDBs,
    _ => bootstrapModels(),
    _ => connectDatabase()
)()
    .catch(err => {
        bootstrapModels().then(cleanDBs).then(_ => {
            console.log(err.message)
            process.exit(1)
        })
    })
