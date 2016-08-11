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
var run = require('run-sequence');
var clean = require('gulp-clean');

// Configuraciones: HIC SUNT DRACONES!

var config = require('./config');

var srcdir = config.srcPath;
var sassdir = srcdir + config.sassPath;
var cssdir = srcdir + config.cssPath;
var jsdir = srcdir + config.jsPath;
var fontsdir = srcdir + config.fontsPath;
var imgdir = srcdir + config.imgPath;


var styleFile = config.styleFile;
var styleMinFile = config.styleMinFile;
var jsFile = config.jsFile;
var jsMinFile = config.jsMinFile;
var indexFile = config.indexFile;
var indexMinFile = config.indexMinFile;

var styleFilePath = cssdir + styleFile;
var styleMinFilePath = cssdir + styleMinFile;
var jsFilePath = jsdir + jsFile;
var jsMinFilePath = jsdir + jsMinFile;
var indexFilePath = srcdir + indexFile;
var indexMinFilePath = srcdir + indexMinFile;

var distdir = config.distFiles;

// Tasks-------------------------------------------------->

// Cleaners

gulp.task('style-clean', function() {
	return gulp.src(styleFilePath, {read: false})
	.pipe(clean());
});

gulp.task('styleMin-clean', function() {
	return gulp.src(styleMinFilePath, {read: false})
	.pipe(clean());
});

gulp.task('js-clean', function() {
	return gulp.src(jsFilePath, {read: false})
	.pipe(clean());
});

gulp.task('jsMin-clean', function() {
	return gulp.src(jsMinFilePath, {read: false})
	.pipe(clean());
});

//~ gulp.task('index-clean', function() {
	//~ return gulp.src(indexFilePath, {read: false})
	//~ .pipe(clean());
//~ });

gulp.task('indexMin-clean', function() {
	return gulp.src(indexMinFilePath, {read: false})
	.pipe(clean());
});

gulp.task('clean', function() {
	run(['style-clean', 'styleMin-clean', 'js-clean', 'jsMin-clean',
		'indexMin-clean']);
});

// Builders

gulp.task('sass', function() {
	run(['style-clean', 'styleMin-clean']);
	
	return gulp.src(sassdir + '**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest(cssdir))
	.pipe(rename(styleMinFile))
	.pipe(cssmin())
	.pipe(gulp.dest(cssdir));
});

gulp.task('js', function() { // Paralelo!!!!!
	run('js-clean', 'jsMin-clean');
	
	return gulp.src(jsdir + '**/*.js')
	.pipe(cat(jsFile))
	.pipe(gulp.dest(jsdir))
	.pipe(rename(jsMinFile))
	.pipe(ugly())
	.pipe(gulp.dest(jsdir));
});

gulp.task('html', function(){
	run('indexMin-clean');
	
	return gulp.src(indexFilePath)
	.pipe(htmlmin())
	.pipe(rename(indexMinFile))
	.pipe(gulp.dest(srcdir));
});

// Watcher
gulp.task('watch', function() {
	gulp.watch(sassdir + '**/*.scss', ['sass']);
	gulp.watch(jsdir + '**/*.js', ['js']);
	gulp.watch(index, ['html']);
});

// Build
gulp.task('build', function() {
	run('sass', 'js', 'html');
});

// Distribute-------------------------------------------->

//~ gulp.task('dist-html', function() {
	//~ return gulp.src()
	//~ .pipe(rename('index.html'))
	//~ .pipe(gulp.dest(distdir));
//~ });

//~ gulp.task('dist-js', function() {
	//~ return gulp.src(jsdir + 'scripts.js')
	//~ .pipe(gulp.dest(distdir + jsdir));
//~ });

//~ gulp.task('dist-css', function() {
	//~ return gulp.src('styles.min.css')
	//~ .pipe(rename('styles.css'))
	//~ .pipe(gulp.dest(distdir + cssdir));
//~ });

//~ gulp.task('dist', function() {
	//~ run('build',
	//~ 'dist-html', 'dist-js', 'dist-css');
//~ });
