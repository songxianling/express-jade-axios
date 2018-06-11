var express = require('express');
var router = express.Router();
var axios = require('axios');
var app = express();
var baseUrl = require('../config')
var xsjEnv = process.env.NODE_ENV;

/* GET home page. */
router.get('/', function (req, res, next) {
    let ApiUrl;
    console.log(req.query);

    if (xsjEnv == 'dev') {
        ApiUrl = `${process.env.BASE_URL}:${process.env.BASE_PORT}`;
    } else if (xsjEnv == 'test') {
        ApiUrl = `${process.env.BASE_URL}:${process.env.BASE_PORT}`;
    }
    // 获取视频详情
    var p1 = new Promise((resolve, reject) => {
        // var url = `${ApiUrl}/V1/Content/getInfo?svCode=${req.query.svCode}`;
        var url = `https://www.easy-mock.com/mock/5b1773bafbe46869c0b686c8/xsj/V1/Content/getInfo`;
        console.log(url);

        axios.get(url).then(function (data) {
            resolve(data.data.data)
            // resolve('one')
            // console.log(data.data.data);
        }).catch(function (error) {
            reject('error');
        });
    })
    // 获取作者热门视频
    var p2 = new Promise((resolve, reject) => {
        // var url = `${ApiUrl}/V1/Content/getContent?id=2&userCode=${req.query.userCode}`;
        var url = `https://www.easy-mock.com/mock/5b1773bafbe46869c0b686c8/xsj/V1/Content/getContent`;
        console.log(url);
        axios.get(url).then(function (data) {
            data.data.data.hotVideoList = data.data.data.list;
            resolve(data.data.data)
            // resolve('one')
            // console.log(data.data.data);
        }).catch(function (error) {
            reject('error');
        });
    })
    // 获取推荐热门视频
    var p3 = new Promise((resolve, reject) => {
        // var url = `${ApiUrl}/V1/Content/getContent?id=2&userCode=${req.query.userCode}`;
        var url = `https://www.easy-mock.com/mock/5b1773bafbe46869c0b686c8/xsj/V1/Content/getContent`;
        console.log(url);
        axios.get(url).then(function (data) {
            data.data.data.recomVideoList = data.data.data.list;
            resolve(data.data.data)
            // resolve('one')
            // console.log(data.data.data);
        }).catch(function (error) {
            reject('error');
        });
    })

    Promise.all([p1, p2, p3]).then((result) => {
        let resDate = {};
        for (let i = 0; i < result.length; i++) {
            let cur = result[i];
            if (cur.state == 2) {
                for (let i in cur) {
                    resDate[i] = cur[i];
                }
            }
        }
        console.log(resDate);
        res.render('home', {
            title: resDate.info.code,
            modelObj: resDate,
        });
        // res.json(result) //['成功了', 'success']
    }).catch((error) => {
        console.log('error2')
    })

    var url = `https://www.easy-mock.com/mock/5b1773bafbe46869c0b686c8/xsj/home`;
    // var param = req.query;
    // console.log(req.query);

    // res.render('home', {
    //     title: '首页',
    //     modelObj: {
    //         "videoInfo": {
    //             "vUrl": "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L",
    //             "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //             "authorname": "是现令啊",
    //             "authorimg": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //             "collectionnum": "777",
    //             "commentnum": "888",
    //             "videodesc": "恭喜RNG夺得2018MSI季中赛冠军恭喜RNG夺得2018MSI季中赛冠军恭喜RNG夺得2018MSI季中赛冠军"
    //         },
    //         "hotVideoList": [{
    //                 "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //                 "id": "1"
    //             },
    //             {
    //                 "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //                 "id": "1"
    //             },
    //             {
    //                 "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //                 "id": "1"
    //             },
    //             {
    //                 "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //                 "id": "1"
    //             },
    //             {
    //                 "poster": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=760838121,1565962456&fm=27&gp=0.jpg",
    //                 "id": "1"
    //             }
    //         ]
    //     },
    //     "code": 10000,
    //     "msg": "success",
    // });
    // axios.get(url).then(function (data) {
    //     if (data.data.code == 10000) {
    //         // console.log(data.data.data);
    //         res.render('home', {
    //             title: '首页',
    //             modelObj: data.data.data,
    //         });
    //     } else {
    //         res.render('error', {
    //             title: '出了点小问题',
    //             message: '服务器打了个盹～～'
    //         });
    //     }
    //     // res.json(data.data)
    // }).catch(function (error) {});
    //   res.render('home',{title:'首页'});
});

router.get('/getUser', function (req, res, next) {
    res.send(user)
})

router.post('/desc', function (req, res, next) {
    console.log('前端请求');
    console.log('ajax=======>' + req.url);
    console.log(req.body.url);
    // var p1 = new Promise((resolve, reject) => {
    //     var url = `${baseUrl}/DishMenus/Main2/Search/searchResult`;

    //     var param = req.body;
    //     console.log('11:' + url, param);
    //     axios.post(url, param).then(function (data) {
    //         resolve(data.data)
    //         // resolve('one')
    //         // console.log('one');

    //     }).catch(function (error) {
    //         reject('error');
    //     });
    // })

    // var p2 = new Promise((resolve, reject) => {
    //     var url = `${baseUrl}/DishMenus/Main2/Search/searchResult`;
    //     var param = req.body;
    //     axios.post(url, param).then(function (data) {
    //         resolve(data.data)
    //         resolve('two')
    //         console.log('two');
    //     }).catch(function (error) {
    //         reject('error');
    //     });
    // })
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