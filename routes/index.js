var express = require('express');
var app = express();

var Home = require('./home');
var User = require('./user');
app.use('/', Home);
app.use('/user', User);

module.exports = app;