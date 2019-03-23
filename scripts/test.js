Promise.resolve('ab')
.then(data => {
    console.log(data)
    return data
}).then(data => {
    console.log(data)
    return data
}).then(data => {
    console.log(data)
    return data
}).then(data => {
    console.log(data)
    return Promise.reject(new Error('sadfasdf'))
}).catch(data => {
    console.log(data)
    return data
})