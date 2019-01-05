// server.js
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const jwt = require('jsonwebtoken')

// Token and Authentication
const createToken = require('./auth/create_token')
const verifyToken = require('./auth/validate_token')
const isAuthenticated = require('./auth/validate_auth')
const authObject = require('./auth/auth_response')

// Object types
const userInfo = require('./types/user')
const sessionInfo = require('./types/session')

const PORT = 8888 // Port

const start = function() {
    
    // MIDDLEWARES
    server.use(middlewares)
    server.use(bodyParser.urlencoded({
        extended: true
    }))
    server.use(bodyParser.json())

    server.post('/auth/login', (req, res) => {
        const {
            username, 
            password
        } = req.body
        if (isAuthenticated({username, password}) === false) {
            const status = 401
            const message = 'Incorrect username or password'
            res.status(status).json({status, message})
            return
        }
        const access_token = createToken({username, password})
        res.status(200).json({access_token})
    })
    
        server.use(/^(?!\/auth).*$/,  (req, res, next) => {
            if (req.headers.authorization === undefined) {
                const status = 401
                const message = 'Bad authorization header'
                res.status(status).json({status, message})
                return
            }
            try {
                verifyToken(req.headers.authorization.split(' ')[0])
                next()
            } catch (err) {
                const status = 401
                const message = 'Error: access_token is not valid'
                res.status(status).json({status, message})
            }
        })
    
        server.use('/api', router)
        server.listen(PORT, () => {
            console.log('JSON Server is running at port:', PORT)
        })
    }

module.exports = start
