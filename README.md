

## 1.单独启动服务
    nodemon app.js
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





