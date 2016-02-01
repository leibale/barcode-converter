var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    git = require('gulp-git'),
    browserify = require('gulp-browserify'),
    inject = require('gulp-inject');

gulp.task('default', ['dist']);

gulp.task('dist', function () {
    return gulp.src('index.js')
        .pipe(browserify({
            standalone: 'barcodeConverter'
        }))
        .pipe(rename('barcode-converter.js'))
        .pipe(gulp.dest('dist'))
        .pipe(git.add());
});