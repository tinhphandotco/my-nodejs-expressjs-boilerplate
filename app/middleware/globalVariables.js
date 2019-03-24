const { PATH } = require('@root/config/index')

module.exports = (req, res, next) => {
    res.locals.session = {
        userAuth: req.session.userAuth || false
    }

    var _render = res.render

    res.render = function (view, options, fn) {
        _render.call(this, view, {
            ...options,
            ADMIN_PREFIX: PATH.ADMIN_PREFIX
        }, fn)
    }

    req.host_url = `${req.protocol}://${req.headers.host}`

    next()
}
