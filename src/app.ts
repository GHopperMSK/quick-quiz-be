import express from "express"
import session from "express-session"
import bodyParser from "body-parser"
import passport from "passport"
import bcrypt from "bcrypt"
import { uuid } from 'uuidv4';
import LocalStratege from "passport-strategy"
import http from "http"
import createError from "http-errors"

var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var debug = require('debug')('quick-quiz-be:server')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var apiRouter = require('./routes/api')
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')

var app = express()

app.use(session({
    "secret": "mySecretKey",
    "resave": true,
    "saveUninitialized": true,
    "cookie" : {
        maxAge:(1000 * 60 * 100)
    }
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/api", apiRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
    next(createError(404))
})

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
    res.render('error')
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1)
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}
