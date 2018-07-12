var express = require('express');
var app = express();

var Home = require('./home');
var Author = require('./author');
app.use('/', Home);
app.use('/author', Author);
app.get('*', function (req, res) {
    res.render('404', {
        title: '哇哦～找不到了',
        list: ''
    });
})
module.exports = app;