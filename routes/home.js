var express = require('express');
var router = express.Router();
var axios = require('axios');
var app = express();
var baseUrl = require('../config')
var xsjEnv = process.env.NODE_ENV;

/* GET home page. */
/**
 * 当前路由内使用的参数
 * @param {Number} svCode 视频code
 * @param {Number} id 类型ID 
 *                   '关注' => '1',
 *                   '推荐' => '2',
 *                   '喜欢' => '3',
 *                   '作品' => '4',
 * @param {Number} userCode 用户code
 * @param {Number} limit 数据条数 默认20
 */
router.get('/', function (req, res, next) {
    let ApiUrl;
    console.log(`参数为${req.query.svCode}`);
    // 根据不同的环境赋值不同的api接口地址
    ApiUrl = `${process.env.BASE_URL}:${process.env.BASE_PORT}`;
    if (req.query.svCode) {
        // 获取视频详情
        var p1 = new Promise((resolve, reject) => {
            var url = `${ApiUrl}/V1/Content/getInfo?svCode=${req.query.svCode}`;
            console.log(url);

            axios.get(url).then(function (data) {
                resolve(data.data.data)
                // resolve('one')
                // console.log(data.data.data);
            }).catch(function (error) {
                reject('error1');
            });
        })
        // 获取作者热门视频
        var p2 = new Promise((resolve, reject) => {
            var url = `${ApiUrl}/V1/Content/getContent?id=4&limit=6&userCode=${req.query.userCode}`;
            console.log(url);
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
        // 获取推荐热门视频
        var p3 = new Promise((resolve, reject) => {
            var url = `${ApiUrl}/V1/Content/getContent?id=2&userCode=${req.query.userCode}`;
            console.log(url);
            axios.get(url).then(function (data) {
                data.data.data.recomVideoList = data.data.data.list;
                delete data.data.data.list;
                resolve(data.data.data)
                // resolve('one')
                // console.log(data.data.data);
            }).catch(function (error) {
                reject('error3');
            });
        })

        Promise.all([p1, p2, p3]).then((result) => {
            let resDate = {};
            // 拼装所有返回的数据
            for (let i = 0; i < result.length; i++) {
                let cur = result[i];
                if (cur.state == 2) {
                    for (let i in cur) {
                        resDate[i] = cur[i];
                    }
                }
            }
            // console.log(resDate);
            res.render('home', {
                title: resDate.info.desc,
                modelObj: resDate,
            });
            // res.json(result) //['成功了', 'success']
        }).catch((error) => {
            console.log('errorAll')
        })
    } else {
        // 获取推荐热门视频
        var p3 = new Promise((resolve, reject) => {
            var url = `${ApiUrl}/V1/Content/getContent?id=2`;
            console.log(url);
            axios.get(url).then(function (data) {
                data.data.data.recomVideoList = data.data.data.list;
                delete data.data.data.list;
                resolve(data.data.data)
                // resolve('one')
                // console.log(data.data.data);
                res.render('error', {
                    title: '没找到视频信息～',
                    modelObj: data.data.data,
                });
            }).catch(function (error) {
                reject('error3');
            });
        })
    }
});


module.exports = router;