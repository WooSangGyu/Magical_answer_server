var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const models = require('./models/index');

var question = require('./routes/question');
var usersRouter = require('./routes/users');

var app = express();

models.sequelize.sync().then( () => {
    console.log("DB connection sucess");
  }).catch(err => {
    console.log("DB connection error.");
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/question', question);
app.use('/users', usersRouter);

module.exports = app;
