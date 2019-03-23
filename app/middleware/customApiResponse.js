module.exports = (req, res, next) => {
    res.sendError = (errors = {}, status = 400, description = '', errorKeyCode = 'COMMON_ERROR') => {
        res.status(status).json({
            'error': {
                status,
                errorKeyCode,
                description,
                ...errors
            }
        })
    }

    res.sendData = (data = null, status = 200) => {
        res.status(status).json({
            status,
            data
        })
    }

    next()
}
