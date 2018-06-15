var express = require('express');
var router = express.Router();
var axios = require('axios');
var app = express();
var baseUrl = require('../config')
var xsjEnv = process.env.NODE_ENV;

/* GET users listing. */
router.get('/', function (req, res, next) {
  let ApiUrl;
  console.log(req.query);

  ApiUrl = `${process.env.BASE_URL}:${process.env.BASE_PORT}`;

  // 获取作者热门视频
  var p1 = new Promise((resolve, reject) => {
    var url = `${ApiUrl}/V1/User/getUserHomeData?userCode=${req.query.userCode}`;
    axios.get(url).then(function (data) {
      resolve(data.data.data)
      // console.log(data.data.data);
    }).catch(function (error) {
      reject('error2');
    });
  })

  // 获取作者热门视频
  var p2 = new Promise((resolve, reject) => {
    var url = `${ApiUrl}/V1/Content/getContent?id=4&limit=6&userCode=${req.query.userCode}`;
    axios.get(url).then(function (data) {
      // 赋值热门视频
      data.data.data.hotVideoList = data.data.data.list;
      delete data.data.data.list;
      resolve(data.data.data)
      // console.log(data.data.data);
    }).catch(function (error) {
      reject('error2');
    });
  })
  
  Promise.all([p1, p2]).then((result) => {
    let resDate = {};
    // res.json(result);
    
    // 拼装所有返回的数据
    for (let i = 0; i < result.length; i++) {
      let cur = result[i];
      if (cur.state == 2) {
        for (let i in cur) {
          resDate[i] = cur[i];
        }
      }
    }
    // res.json(resDate); 
    res.render('author', {
      title: '个人中心～',
      modelObj: resDate,
    });
  }).catch((error) => {
    console.log('errorAll')
  })
  // res.render('author', {
  //   title: '个人中心',
  //   con: 'user-page'
  // });
});
router.get('/abc', function (req, res, next) {
  res.send('abc users page');
});

module.exports = router;