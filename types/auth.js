const UserType = require('./user')

const Auth = function(user, sessionId) { 
    const response = new UserType(user)
    response.sessionId = sessionId
    
    return response
}

module.exports = Auth
