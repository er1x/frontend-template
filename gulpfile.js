var gulp        = require('gulp'),
    browserify  = require('gulp-browserify'),
    stripDebug  = require('gulp-strip-debug'),
    connect     = require('gulp-connect'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    stylus      = require('gulp-stylus'),
    minifyHTML  = require('gulp-minify-html'),
    nib         = require('nib'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    del         = require('del');


/// Subtasks
///
///

// JS
gulp.task('js:dev', function () {
  return gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app/js'))
    .pipe(connect.reload());
});

gulp.task('js:prod', function () {
  return gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});
/// /JS


/// Stylus
gulp.task('stylus:dev', function () {
  return gulp.src('app/stylus/main.styl')
    .pipe(stylus({use: nib()}))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

gulp.task('stylus:prod', function () {
  return gulp.src('app/stylus/main.styl')
    .pipe(stylus({compress: true, use: nib()}))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./dist/css'));
});
/// /Stylus


/// HTML
gulp.task('html:dev', function () {
  return gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('html:prod', function () {
  return gulp.src('./app/*.html')
  .pipe(minifyHTML())
  .pipe(gulp.dest('./dist'));
});
/// /HTML


/// Misc
gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  return gulp.src('app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function(cb){
  del(['dist'], cb());
});
/// /Misc


// Connect & Watch
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 9000
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], ['html:dev']);
  gulp.watch(['./app/js/**/*', '!./app/js/bundle.js'], ['js:dev']);
  gulp.watch(['./app/stylus/**/*'], ['stylus:dev']);
});

///
/// /Subtasks



// Main tasks

// Development watch task
gulp.task('default', ['connect', 'js:dev', 'stylus:dev', 'watch']);

// Optimize and build task
gulp.task('build', function(callback) {
  runSequence('clean',
              'js:prod',
              'stylus:prod', 
              'html:prod', 
              'fonts', 
              'images',
              callback);
});
