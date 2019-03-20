const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

const jsFiles = ['./src/js/main.js'];

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    notify: false,
  });
});

gulp.task('sass', function() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src(jsFiles)
    .pipe(
      babel({
        ignore: [`./src/js/vendor`],
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(concat('main.js'))
    .pipe(gulp.dest(`./dist/js`))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/js/**/*.js', gulp.task('js'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('serve', 'watch'));
