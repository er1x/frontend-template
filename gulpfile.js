var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    stripDebug = require('gulp-strip-debug'),
    connect    = require('gulp-connect'),
    rename     = require('gulp-rename'),
    imagemin   = require('gulp-imagemin'),
    stylus     = require('gulp-stylus'),
    minifyHTML = require('gulp-minify-html'),
    nib        = require('nib'),
    uglify     = require('gulp-uglify');


/// Subtasks
///
///

// JS
gulp.task('js-dev', function () {
  gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('js', function () {
  gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});
/// /JS


/// Stylus
gulp.task('stylus-dev', function () {
  gulp.src('app/stylus/main.styl')
    .pipe(stylus({use: nib()}))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('stylus', function () {
  gulp.src('app/stylus/main.styl')
    .pipe(stylus({compress: true, use: nib()}))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./dist/css'));
});
/// /Stylus


/// HTML
gulp.task('html-dev', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
  .pipe(minifyHTML())
  .pipe(gulp.dest('./dist'));
});
/// /HTML


/// Misc
gulp.task('fonts', function () {
  gulp.src('app/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('images', function () {
  gulp.src('app/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
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
  gulp.watch(['./app/**/*.html'], ['html-dev']);
  gulp.watch(['./app/js/**/*', '!./app/js/bundle.js'], ['js-dev']);
  gulp.watch(['./app/stylus/**/*'], ['stylus-dev']);
});

///
/// /Subtasks



// Main tasks

// Serve task
gulp.task('default', ['connect', 'js-dev', 'stylus-dev', 'watch']);

// Optimize and build task
gulp.task('build', ['js', 'stylus', 'html', 'fonts', 'images']);
