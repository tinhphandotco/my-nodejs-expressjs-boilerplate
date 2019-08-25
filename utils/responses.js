const { REQUEST_STATUSES } = require('@constants/index')
const { PATH } = require('@config/index')

const sendData = (res, { data = null, status = REQUEST_STATUSES.OK }) => {
    res.status(status.code).json({
        code: status.code,
        message: status.description,
        data
    })
}

const sendError = (res, { errors = null, status = REQUEST_STATUSES.BAD_REQUEST }) => {
    res.status(status.code).json({
        code: status.code,
        message: status.description,
        errors
    })
}

const render = (res, { view = '', options = {}, cb }) => {
    res.render(view, {
        ADMIN_PREFIX: PATH.ADMIN_PREFIX,
        ...options
    }, cb)
}

module.exports = {
    sendData,
    sendError,
    render
}
