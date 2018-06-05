var express = require('express');
var app = express();

var Home = require('./home');
var Author = require('./author');
app.use('/', Home);
app.use('/author', Author);

module.exports = app;