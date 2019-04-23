module.exports = (err, next, defaultMessage) => {
    if(err.code) {
        next({ code: err.code, message: err.message})
    } else {
        next({ code: 500, message: defaultMessage})
    }
}
