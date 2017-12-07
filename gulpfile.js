var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    image = require('gulp-image'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify');

// Constants.
var pathsRoot = {
    src: 'src/',
    dest: 'dist/'
};

var paths = {
    src: {
        styles: pathsRoot.src + 'styles/',
        images: pathsRoot.src + 'images/',
        js: pathsRoot.src + 'js/',
        fonts: pathsRoot.src + 'fonts/'
    },
    dest: {
        styles: pathsRoot.dest + 'styles/',
        images: pathsRoot.dest + 'images/',
        js: pathsRoot.dest + 'js/',
        fonts: pathsRoot.dest + 'fonts/'
    }
};

// Images.
gulp.task('images:build', function () {
    gulp.src(paths.src.images + '**')
        .pipe(plumber())
        .pipe(newer(paths.dest.images))
        .pipe(image())
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.dest.images));
});

// Styles.
gulp.task('styles:build', function () {
    gulp.src(paths.src.styles + 'styles.scss')
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('styles.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.dest.styles))
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.dest.styles));
});

// JS
gulp.task('js:build', function () {
    gulp.src(paths.src.js + '**')
        .pipe(concat('scripts.js'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.dest.js));
});

// Fonts
gulp.task('fonts:build', function () {
    gulp.src(paths.src.fonts + '**')
        .pipe(gulp.dest(paths.dest.fonts));
});

// Default.
gulp.task('default', ['styles:build', 'images:build', 'js:build', 'fonts:build']);

// Watchers.
gulp.task('watch', ['styles:watch', 'images:watch', 'js:watch']);

gulp.task('styles:watch', function () {
    return gulp.watch([paths.src.styles + '/**'], ['styles:build']);
});

gulp.task('images:watch', function () {
    return gulp.watch([paths.src.images + '/**'], ['images:build']);
});

gulp.task('js:watch', function () {
    gulp.watch([paths.src.js + '/**/*.js'], ['js:build']);
});