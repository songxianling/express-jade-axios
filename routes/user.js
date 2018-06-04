var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user',{con:'user-page'});
});
router.get('/abc', function(req, res, next) {
    res.send('abc users page');
});

module.exports = router;
