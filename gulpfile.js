'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		notify: false
	});
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});


var defaultTasks = ['sass', 'serve', 'watch'];
gulp.task('default', defaultTasks);
