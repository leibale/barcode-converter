var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    git = require('gulp-git'),
    browserify = require('gulp-browserify'),
    inject = require('gulp-inject'),
    codePath = {
        server: 'index.js',
        client: './lib/client/sp-barcode-converter.js'
    };

gulp.task('default', ['dist']);

gulp.task('dist', function () {
    return gulp.src(codePath.server)
        .pipe(browserify({
            standalone: 'barcodeConverter'
        }))
        .pipe(rename('barcode-converter.js'))
        .pipe(gulp.dest('dist'))
        .pipe(git.add());
});