const { REQUEST_STATUSES } = require('@root/constants/index')

module.exports = (req, res, next) => {
    res.sendError = (errors = [], requestStatus = REQUEST_STATUSES.BAD_REQUEST) => {
        res.status(requestStatus.code).json({
            'error': {
                status: requestStatus.code,
                description: requestStatus.description,
                details: errors || []
            }
        })
    }

    res.sendData = (data = null, requestStatus = REQUEST_STATUSES.OK) => {
        res.status(requestStatus.code).json({
            status: requestStatus.code,
            description: requestStatus.description,
            data: data
        })
    }

    next()
}
