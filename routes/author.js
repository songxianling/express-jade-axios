var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function (req, res, next) {
  console.log(req.query);
  
  res.render('author', {
    title: '个人中心',
    con: 'user-page'
  });
});
router.get('/abc', function (req, res, next) {
  res.send('abc users page');
});

module.exports = router;