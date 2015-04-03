'use strict';

var gulp = require('gulp');

// plugins
var bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('bower', function() {
  return bower()
  .pipe(gulp.dest('bower_components/'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
  .pipe(concat('build.js'))
  .pipe(gulp.dest('assets/build'))
  .pipe(rename('build.min.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('assets/build'));
});

// Concatenate & Minify Bower Components
gulp.task('bowerScripts', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/angular-filter/dist/angular-filter.js'
  ])
  .pipe(concat('components.js'))
  .pipe(gulp.dest('assets/build'))
  .pipe(rename('components.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('assets/build'));
});
// Concatenate & Minify Bower Components
gulp.task('bowerStyles', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(concat('components.css'))
  .pipe(gulp.dest('assets/build'));
});

// Get one .styl file and render
gulp.task('styles', function () {
  gulp.src([
    'assets/css/app.css'
  ])
  .pipe(stylus())
  .pipe(gulp.dest('assets/build'))
  .pipe(livereload());
});

gulp.task('stylesProd', function () {
  gulp.src([
    'assets/css/app.css'
  ])
  .pipe(stylus())
  .pipe(gulp.dest('assets/build'))
});

gulp.task('componentStyles', function () {
  gulp.src([])
  .pipe(stylus())
  .pipe(gulp.dest("assets/components"))
  .pipe(livereload());
});

gulp.task('componentStylesProd', function () {
  gulp.src([])
  .pipe(stylus())
  .pipe(gulp.dest("assets/components"))
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('assets/css/**/*', ['styles']);
  gulp.watch('assets/components/**/*', ['componentStyles']);
});

gulp.task('default', ['bower','scripts','bowerScripts','bowerStyles','styles','componentStyles','watch']);
gulp.task('prod', ['bower','bowerScripts','bowerStyles','stylesProd','componentStylesProd','scripts']);
