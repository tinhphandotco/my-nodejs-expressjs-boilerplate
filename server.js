'use strict'

/*
 * Copyright(c) 2019 Tinh Phan <tinh.phan.v@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('module-alias/register')

const mongoose = require('mongoose')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const config = require('@root/config/index')
const { composePromise } = require('@root/utils/common')
const cronJobs = require('@root/app/cronjobs/index')

const {
    models: bootstrapModels,
    routes: bootstrapRoutes,
    cronJobs: bootstrapCronJobs
} = require('@root/bootstrap/index')

const socket = require('@root/app/socket/index')

const connectDatabase = (url = config.DATABASE.DATABASE_URL) => new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', (err) => reject(new Error(`MongoDb connection error: ${err.message}`)))
    db.once('open', resolve)
})

const connectSocket = (extra) => new Promise((resolve, reject) => {
    socket(io, extra)
    resolve()
})

const listen = (port) => new Promise((resolve, reject) => {
    http.listen(port, () => {
        console.log(`<${config.APP.NAME}> app is listening on: http://localhost:${port}`)
        resolve()
    })
})

composePromise(
    _ => listen(config.APP.PORT),
    cronJobs => connectSocket({ cronJobs }),
    _ => bootstrapCronJobs(cronJobs),
    _ => bootstrapRoutes(app),
    _ => bootstrapModels(config),
    _ => connectDatabase()
)()
    .catch(err => {
        console.log(err.message)
    })

process.on('unhandledRejection', err => {
    console.log(err)
    console.error('Uncaught Error', err && err.message)
})
