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

const { bootstrapModels, bootstrapRoutes } = require('@root/bootstrap/index')
const socket = require('@root/app/socket/index')

const connectDatabase = (url = config.DATABASE.DATABASE_URL) => new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', (err) => reject(new Error(`MongoDb connection error: ${err.message}`)))
    db.once('open', resolve)
})

const connectSocket = () => new Promise((resolve, reject) => {
    socket(io)
    resolve()
})

const bootstrapApp = () => new Promise((resolve, reject) => {
    bootstrapModels()
    bootstrapRoutes(app)
    resolve()
})

const listen = (port = config.APP.PORT) => new Promise((resolve, reject) => {
    http.listen(port, () => {
        console.log(`<${config.APP.NAME}> app is listening on port: ${port}`)
        resolve()
    })
})

Promise.all([
    connectDatabase(),
    bootstrapApp(),
    connectSocket(),
    listen(config.APP.PORT)
])
    .then(() => {
    })
    .catch(err => {
        console.log(err.message)
    })
