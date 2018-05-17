var gulp = require('gulp');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
gulp.task('server', function() {
    gulp.src('.')
        .pipe(webserver({
            port: 8000,
            host: 'localhost',
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/index') {
                    console.log(fs.readFileSync('data.json').toString())
                    res.end(fs.readFileSync('data.json').toString())
                }
                next();
            }
        }))
})
gulp.task('default', ['server'])