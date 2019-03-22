const path = require('path')
const modelNameList = require('@root/app/models/index')
const config = require('@root/config/index')

module.exports = (options) => new Promise((resolve, reject) => {
    const models = modelNameList.map(
        modelName => require(path.resolve(config.PATH.ROOT, `app/models/${modelName}`))
    )
    resolve(models)
})
