var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uncss = require('gulp-uncss');
var globby = require("globby");
var ngConstant = require('gulp-ng-constant');
var includeSources = require('gulp-include-source');
var extend = require('gulp-extend');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

// Custom gulp tasks for ionicapp...
gulp.task('cleanup-css', function() {
    return gulp.src('www/css/style.css')
        .pipe(uncss({
            html: globby.sync(['www/index.html', 'www/templates/**/*.html'])
        }))
        .pipe(gulp.dest('.out'));
});

var config = function(src) {
    return gulp.src(['www/js/config/config-global.json', src])
        .pipe(extend('config.json', true))
        .pipe(ngConstant({
            deps: false
        }))
        .pipe(rename(function(path) {
            path.basename = 'config'
        }))
        .pipe(gulp.dest('www/js/config/'));
}

gulp.task('config-dev', function() {
    return config('www/js/config/config-dev.json')
});


gulp.task('config-prod', function() {
    return config('www/js/config/config-prod.json')
});

gulp.task('include-scripts', function() {
    return gulp.src('www/index.html')
        .pipe(includeSources())
        .pipe(gulp.dest('www'));
});
