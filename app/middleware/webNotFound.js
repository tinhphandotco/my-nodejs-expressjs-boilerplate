const { render } = require('@utils/responses')

module.exports = (req, res) => {
    render(res, { view: 'errors/404' })
}
