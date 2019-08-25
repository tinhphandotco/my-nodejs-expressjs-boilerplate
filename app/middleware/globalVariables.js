module.exports = (req, res, next) => {
    res.locals.session = {
        userAuth: req.session.userAuth || false
    }

    req.hostDomain = `${req.protocol}://${req.headers.host}`

    next()
}
