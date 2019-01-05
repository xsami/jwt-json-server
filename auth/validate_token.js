const key = require('./keys')
const jwt = require('jsonwebtoken')

// Verify the token 
const verifyToken = function(token) {
    return jwt.verify(token, key.SECRET_KEY)
}

module.exports = verifyToken
