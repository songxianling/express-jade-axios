//引入gulp
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
        'public/*.*'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: '192.168.1.61:1717',
        browser: 'chrome',
        notify: false,
        port: 1718 //这个是browserSync对proxy实现的代理端口

    });
    gulp.watch(files).on("change", reload);
});