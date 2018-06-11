// 每次修改了此文件的监听规则；则需要重新执行开启服务才行
// 执行命令为 gulp server  开启后会自动开启nodemon服务；配合scss转css一起使用；达到热更新效果
// 引入gulp
var gulp = require('gulp');
// 添加引用
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
const config = require('./config')

gulp.task('sass', function () {
    return gulp.src('public/stylesheets/*.scss')
        // 嵌套输出方式 nested
        // 展开输出方式 expanded 
        // 紧凑输出方式 compact 
        // 压缩输出方式 compressed
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/css'))
})

// dev server
// 启动 express 并添加 browserSync 支持热更新
gulp.task('dev:server', function () {
    var files = [
        'views/*.html',
        'views/*.ejs',
        'views/*.jade',
        'public/**/*.*',
        'public/**/*.css'
    ];
    nodemon({
        script: './app.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'dev',
            'BASE_URL': config.DevApi,
            'BASE_PORT': config.DevPort
        }
    })
    browserSync.init(files, {
        proxy: 'http://localhost:' + config.proxyPort,
        browser: 'chrome',
        notify: false,
        open: true,
        port: 5000 //这个是browserSync对proxy实现的代理端口
    });
    gulp.watch(files).on("change", reload);
})

// 测试服务
gulp.task('test:server', function () {
    var files = [
        'views/*.html',
        'views/*.ejs',
        'views/*.jade',
        'public/**/*.*',
        'public/**/*.css'
    ];
    nodemon({
        script: './app.js',
        ignore: ['.vscode', '.idea', 'node_modules'],
        env: {
            'NODE_ENV': 'dev',
            'BASE_URL': config.TestApi,
            'BASE_PORT': config.TestPort
        }
    })
    browserSync.init(files, {
        proxy: 'http://localhost:' + config.proxyPort,
        browser: 'chrome',
        notify: false,
        open: true,
        port: 5000 //这个是browserSync对proxy实现的代理端口
    });
    gulp.watch(files).on("change", reload);
})

// watching
gulp.task('watch', function () {
    gulp.watch('public/stylesheets/*.scss', ['sass'])
})


gulp.task('dev', ['dev:server', 'sass', 'watch'])
gulp.task('test', ['test:server', 'sass', 'watch'])