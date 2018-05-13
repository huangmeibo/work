var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var miniHtml = require('gulp-htmlmin');
var miniCss = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var Sequence = require('gulp-sequence');
var fs = require('fs');
var url = require('url');

//编译es6
gulp.task('babel', function() {
    return gulp.src('src/javascript/*.js') //需要编译的文件
        .pipe(babel({
            presets: 'es2015' //指定编译后的版本为es5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/javascript')); //编译后存放文件的路径
});
//压缩js
// gulp.task('uglify', function() {
//     return gulp.src('src/javascript/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/javascript'))
// });

//压缩css
gulp.task('miniCss', function() {
    return gulp.src('src/css/*.css')
        .pipe(miniCss())
        .pipe(gulp.dest('dist/css'))
});


//压缩html
gulp.task('miniHtml', function() {
    return gulp.src('src/*.html')
        .pipe(miniHtml({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function() {
        return gulp.src('src')
            .pipe(webserver({
                    port: 8000,
                    host: 'localhost',
                    livereload: true,
                    middleware: function(req, res, next) {

                        var urlObj = url.parse(req.url, true);

                        if (req.url == '/page') {
                            // console.log(fs.readFileSync('src/data.json').toString());
                            res.end(fs.readFileSync('./data.json').toString());

                        }
                        next();
                    }
                }

            ))
    })
    //"babel", "miniCss", "miniHtml",
gulp.task('default', function(cb) {
    Sequence(["miniCss", "miniHtml"], "babel", "webserver", cb)
})