module.exports = (app) => new Promise((resolve, reject) => {
    console.log('Boostrap routes')
    setTimeout(() => {
        resolve()
    }, 1000)
})
