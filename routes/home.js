var express = require('express');
var router = express.Router();
var axios = require('axios');
var app = express();
/* GET home page. */
router.get('/', function (req, res, next) {
    var url = 'http://apiwx.xiangha.com/DishMenus/Main2/Search/searchResult';
    var param = {
        "keywords": "素菜",
        "page": 1,
        "type": "caipu",
        "userCode": ""
    };
    axios.post(url, param).then(function (data) {
        if (data.data.code == 10000) {
            res.render('home', {
                title: '首页',
                list: data.data.data,
                ourl: '111'
            });
        } else {
            res.render('error', {
                title: '出了点小问题',
                message: '服务器打了个盹～～'
            });
        }
        // res.json(data.data)
    }).catch(function (error) {});
    //   res.render('home',{title:'首页'});
});

router.get('/getUser', function (req, res, next) {
    res.send(user)
})
var gUrl = 'http://apiwx.xiangha.com';

router.post('/DishMenus/Main2/Search/searchResult', function (req, res, next) {
    var p1 = new Promise((resolve, reject) => {
        var url = gUrl + '/DishMenus/Main2/Search/searchResult';
        var param = req.body;
        axios.post(url, param).then(function (data) {
            // resolve(data.data)
            // resolve('one')
            // console.log('one');

        }).catch(function (error) {
            reject('error');
        });
    })

    var p2 = new Promise((resolve, reject) => {
        var url = gUrl + '/DishMenus/Main2/Search/searchResult';
        var param = req.body;
        axios.post(url, param).then(function (data) {
            // resolve(data.data)
            resolve('two')
            console.log('two');
        }).catch(function (error) {
            reject('error');
        });
    })
    Promise.all([p1, p2]).then((result) => {
        console.log(result);
        // if(result == 'one'){
        //     Promise.race([p2])
        // }else{
        //     Promise.race([p1])
        // }
        res.json(result) //['成功了', 'success']
    }).catch((error) => {
        console.log('error')
    })
    //
    // var url = 'http://apiwx.ixiangha.com/DishMenus/Main2/Search/searchResult';
    // var param = {"keywords":"素菜","page":1,"type":"caipu","userCode":""};
    // axios.post(url,param).then(function (data) {
    //     // console.log(data.data)
    //     res.json(data.data)
    // }).catch(function (error) {
    //     console.log(error);
    // });
    // console.log(url)
})

module.exports = router;