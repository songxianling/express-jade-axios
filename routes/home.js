var express = require('express');
var router = express.Router();
var axios = require('axios');
var app = express();
var baseUrl = require('./config')

/* GET home page. */
router.get('/', function (req, res, next) {
    // var url =  `${baseUrl}/DishMenus/Main2/Search/searchResult`;
    var url =  `https://www.easy-mock.com/mock/5b1773bafbe46869c0b686c8/xsj/home`;
    var param = {
        "keywords": "素菜",
        "page": 1,
        "type": "caipu",
        "userCode": ""
    };
    axios.get(url).then(function (data) {
        
        
        if (data.data.code == 10000) {
            console.log(data.data.data);
            res.render('home', {
                title: '首页',
                modelObj: data.data.data,
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

router.post('/DishMenus/Main2/Search/searchResult', function (req, res, next) {
    var p1 = new Promise((resolve, reject) => {
        var url = `${baseUrl}/DishMenus/Main2/Search/searchResult`;
        
        var param = req.body;
        console.log('11:'+url,param);
        axios.post(url, param).then(function (data) {
            resolve(data.data)
            // resolve('one')
            // console.log('one');

        }).catch(function (error) {
            reject('error');
        });
    })

    var p2 = new Promise((resolve, reject) => {
        var url = `${baseUrl}/DishMenus/Main2/Search/searchResult`;
        var param = req.body;
        axios.post(url, param).then(function (data) {
            resolve(data.data)
            resolve('two')
            console.log('two');
        }).catch(function (error) {
            reject('error');
        });
    })
    // Promise.all([p1, p2]).then((result) => {
    //     console.log(result);
    //     // if(result == 'one'){
    //     //     Promise.race([p2])
    //     // }else{
    //     //     Promise.race([p1])
    //     // }
    //     res.json(result) //['成功了', 'success']
    // }).catch((error) => {
    //     console.log('error')
    // })
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