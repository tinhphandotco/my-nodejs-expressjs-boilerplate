const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
        )

module.exports = {
    composePromise
}
