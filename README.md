# express+jade+gulp 项目

## 关键命令

``` bash
# 加载模块
npm install

# 运行测试环境，已配置热更新
npm run dev

# 打包用于生产环境
npm run test
```

想查看代码展示效果；可直接单独执行npm run dev 来开启热更新和sass转css服务

    进入命令行中提示的  External 地址即可～～

http://localhost:5000/?svCode=1258&userCode=aaaa38bcd  进入主页
http://localhost:5000/author?svCode=1258&userCode=aaaa38bcd  进入个人中心
http://localhost:5000/123123  全部展示404页面；路由不改变


## 已废弃readme
## 1.单独启动服务
    ~~nodemon app.js~~
    监听app.js下面的端口服务
## 2.启动sass编译
    node-sass  -w -r ../stylesheets -o ../stylesheets

    需要先安装 node-sass 

    

## 3.开启热更新模式
    gulp server    

    需要安装  gulp   browser-sync   gulp-nodemon

    cnpm install gulp --save-dev

    cnpm install browser-sync --save-dev

    cnpm install gulp-nodemon --save-dev

## 需要同时  启动 2和3服务才能达到成功的自动刷新效果



    


https://expressjs.com/en/3x/api.html#request


