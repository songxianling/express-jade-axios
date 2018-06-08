// 每次修改了此文件的监听规则；则需要重新执行开启服务才行
// 执行命令为 gulp server  开启后会自动开启nodemon服务；配合scss转css一起使用；达到热更新效果
// 引入gulp
var gulp = require('gulp');
// 添加引用
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

//这个可以让express启动
gulp.task("node", function () {
    nodemon({
        script: './app.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});


gulp.task('server', ["node"], function () {
    var files = [
        'views/*.html',
        'views/*.ejs',
        'views/*.jade',
        'public/**/*.*',
        'public/**/*.css'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: '192.168.1.61:1111',
        browser: 'chrome',
        notify: false,
        port: 1112 //这个是browserSync对proxy实现的代理端口

    });
    gulp.watch(files).on("change", reload);
});