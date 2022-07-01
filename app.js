var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config({
  path: `./environments/${process.env.SCOPE === 'development' ? process.env.SCOPE : 'production'}.env`  
})

console.log(process.env.MONGODB_URI);

var app = express();

mongoose.connect(process.env.MONGODB_URI).then( () => {
  console.log('connected to the database')
}).catch( err => console.log(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//http://localhost:3000/v1/users/
app.use('/v1/users', require('./controllers/getUsers'));
//http://localhost:3000/v1/users/:id
app.use('/v1/users', require('./controllers/getUser'));
//http://localhost:3000/v1/users/
app.use('/v1/users', require('./controllers/postUsers'));
//http://localhost:3000/v1/users/:id
app.use('/v1/users', require('./controllers/putUser'));
//http://localhost:3000/v1/users/:id
app.use('/v1/users', require('./controllers/patchUser'));
//http://localhost:3000/v1/users/:id
app.use('/v1/users', require('./controllers/deleteUser'));


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
