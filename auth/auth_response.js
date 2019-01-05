const AuthType = require('./../types/auth')

// Manage the information sent on the response object for Auth
const authObject = function (sessionId, user) {
    const Response = new AuthType(user, sessionId)
    return Response;
}

module.exports = authObject
