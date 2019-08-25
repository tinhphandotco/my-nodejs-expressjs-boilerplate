const path = require('path')
const express = require('express')
const expressEjsExtend = require('express-ejs-extend')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('@config/index')
const compileSass = require('express-compile-sass')
const root = process.cwd()

// midleware
const {
    webNotFound,
    checkApiVersion,
    globalVariables
} = require('@middleware/index')

// routes
const {
    apiRoute,
    adminRoute,
    webRoute
} = require('@routes/index')

module.exports = (app, io) => {
    app.use(cors(config.CORS))

    // View engine
    app.set('view engine', 'ejs')
    app.engine('ejs', expressEjsExtend)
    app.set('views',
        path.resolve(config.PATH.ROOT, 'app/views')
    )

    // Complie sacss
    app.use(compileSass({
        root: root,
        sourceMap: true, // Includes Base64 encoded source maps in output css
        sourceComments: true, // Includes source comments in output css
        watchFiles: true, // Watches sass files and updates mtime on main files for each change
        logToConsole: false // If true, will log to console.error on errors
    }))

    // Static
    app.use('/public', express.static(path.resolve(config.PATH.ROOT, 'public')))
    app.use('/uploads', express.static(path.resolve(config.PATH.ROOT, 'storage/uploads')))

    // Config for session
    app.set('trust proxy', 1) // trust first proxy
    app.use(session(config.SESSION))

    // config for body paser
    app.use(bodyParser.json({ limit: '10mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

    // global variables

    app.use(globalVariables)

    // Api route
    app.use('/api/:api_version', checkApiVersion, apiRoute)

    // Admin route
    app.use(config.PATH.ADMIN_PREFIX, adminRoute)

    // Web route
    app.use('/', webRoute)

    app.use(webNotFound)

    return app
}
