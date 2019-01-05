const fs = require('fs')
const userdb = JSON.parse(fs.readFileSync('users.json', 'UTF-8'))

// Check if the user exists in database
const isAuthenticated = function({
    username,
    password
}) {
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

module.exports = isAuthenticated
