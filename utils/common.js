const randInt = (start, stop) => {
    return Math.floor(Math.random() * (stop - start + 1) + start)
}

const randFloat = (start, stop, fixed = 2) => {
    return parseFloat((Math.random() * (stop - start + 1) + start).toFixed(fixed))
}

const toJsonObject = (data = [], key) => {
    if (key) {
        return data.reduce((cur, next) => {
            let tmp = {}
            try {
                // eslint-disable-next-line no-eval
                if (eval('next.' + key)) {
                    // eslint-disable-next-line no-eval
                    tmp = { ...cur, [eval('next.' + key)]: next }
                } else {
                    tmp = cur
                }
            } catch (er) {
                tmp = { ...cur }
            }
            return tmp
        }, {})
    }
    return data
}

const formatVnd = (money) => {
    return money ? money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '0VND'
}

const vndToUsd = (money) => +money / 23255.814

const getDataObject = (data, keys = '', cb = () => { }) => {
    let res = null
    try {
        // eslint-disable-next-line no-eval
        res = eval('data.' + keys)
    } catch (er) {
    }
    cb(res)
    return res
}

const isInt = function (nVal) {
    return typeof nVal === 'number' && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal
}

const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
        )

module.exports = {
    randInt,
    randFloat,
    toJsonObject,
    formatVnd,
    vndToUsd,
    getDataObject,
    isInt,
    composePromise
}
