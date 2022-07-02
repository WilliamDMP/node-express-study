var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
//configuracion de la varible de entorno
require('dotenv').config({
  path: `./environments/${process.env.SCOPE === 'development' ? process.env.SCOPE : 'production'}.env`  
})

console.log(process.env.MONGODB_URI);

var app = express();

//establecer conexion a mongodb con la ruta hacia mongodb
mongoose.connect(process.env.MONGODB_URI).then( () => {
  console.log('connected to the database')
}).catch( err => console.log(err))

var indexRouter = require('./routes/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//endpoints necesarios
//http://localhost:3000/v1/api/users
app.use('/v1/api', require('./controllers/getUsers'));
//http://localhost:3000/v1/api/users/:id
app.use('/v1/api', require('./controllers/getUser'));
//http://localhost:3000/v1/api/users
app.use('/v1/api', require('./controllers/postUsers'));
//http://localhost:3000/v1/api/users/:id
app.use('/v1/api', require('./controllers/putUser'));
//http://localhost:3000/v1/api/users/:id
app.use('/v1/api', require('./controllers/patchUser'));
//http://localhost:3000/v1/api/users/:id
app.use('/v1/api', require('./controllers/deleteUser'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
