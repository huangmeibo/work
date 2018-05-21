var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 8000,
            host: 'localhost',
            livereload: true,
            middleware: function(req, res, next) {
                next();
            }
        }))
})
gulp.task('default', ['webserver'])