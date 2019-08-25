module.exports = (req, res, next) => {
    if (!~['v1'].indexOf(req.params.api_version)) {
        res.status(404).json({
            message: 'Bad request'
        })
    } else next()
}
