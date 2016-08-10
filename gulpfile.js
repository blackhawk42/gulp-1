var gulp = require('gulp');

// SASS y CSS
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');

// Javascript
var cat = require('gulp-concat');
var ugly = require('gulp-uglify');

// HTML
var htmlmin = require('gulp-html-minify');

// Utilidades varias
var rename = require('gulp-rename');
var copy = require('gulp-copy');

// Configuraciones
var run = require('run-sequence');
var config = require('./config');

var sassdir = config.sassFiles;
var cssdir = config.cssFiles;
var jsdir = config.jsFiles;
var fontsdir = config.fontsFiles;
var imgdir = config.imgFiles;

var index = config.indexFile;

var distdir = config.distFiles;

// Tasks-------------------------------------------------->

gulp.task('sass', function() {
	return gulp.src(sassdir + '**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest(cssdir))
	.pipe(rename('styles.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest(cssdir));
});

gulp.task('js', function() {
	return gulp.src(jsdir + '**/*.js')
	.pipe(cat('scripts.js'))
	.pipe(gulp.dest(jsdir))
	.pipe(rename('scripts.min.js'))
	.pipe(ugly())
	.pipe(gulp.dest(jsdir));
});

gulp.task('html', function(){
	return gulp.src(index)
	.pipe(htmlmin())
	.pipe(rename('index.min.html'))
	.pipe(gulp.dest('app/'));
});

// Watcher
gulp.task('watch', function() {
	gulp.watch(sassdir + '**/*.scss', ['sass']);
	gulp.watch(jsdir + '**/*.js', ['js']);
	gulp.watch(index, ['html']);
});

// Distribute
gulp.task('dist', function() {

});

// Build
gulp.task('build', function() {
	run('sass', 'js', 'html', 'dist');
});
