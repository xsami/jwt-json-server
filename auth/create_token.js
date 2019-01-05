const key = require('./keys')
const jwt = require('jsonwebtoken')

// Create the token
const createToken = function(payload) {
    return jwt.sign(payload, key.SECRET_KEY, {
        expiresIn: key.expiresIn
    })
}

module.exports = createToken
