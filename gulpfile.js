var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var concat = require('gulp-concat');

var source = './src';
var prod = './dist';

gulp.task('css', function() {
  return gulp.src(source + '/assets/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(prod + '/assets/css/'));
});

gulp.task('js', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify().on('error', function(e){
        console.log(e);
      }))
    .pipe(gulp.dest(prod + '/assets/js/'));
});

gulp.task('img', function () {
  return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(prod + '/assets/img'));
});

gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.scss', ['css']);
  gulp.watch(source + '/assets/js/*.js', ['js']);
});
