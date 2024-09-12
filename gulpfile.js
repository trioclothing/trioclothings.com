// //Import

// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const sourceMaps = require('gulp-sourcemaps');
// const autoprefixer = require('gulp-autoprefixer');
// const browserSync = require('browser-sync').create;
// const del = require('del');

// //SCSS

// function style() {
//     return gulp.src('./assets/scss/*.scss')
//     .pipe(sourceMaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(sourceMaps.write('./'))
//     .pipe(gulp.dest('./assets/css'))
//     .pipe(browserSync.stream());
// }


// // Clean the dist directory
// function clean() {
//     return del(['dist']);
// }

// // Copy all necessary files to dist
// function copy() {
//     return gulp.src([
//         './*.html',
//         './assets/css/**/*.css',
//         './assets/js/**/*.js',
//         './assets/images/**/*'
//     ], { base: './' })
//     .pipe(gulp.dest('dist'));
// }

// // Build Task
// const build = gulp.series(clean, style, copy);


// //Serve and watch

// function watch() {
//     browserSync.init({
//         server: {
//             baseDir: './',
//         },
//         startPath: './index.html',
//         ghostMode: false,
//         notify: false
//     });
//     gulp.watch('./assets/scss/*.scss', style);
//     gulp.watch('./*.html').on('change', browserSync.reload);
//     gulp.watch('./assets/js/*.js').on('change', browserSync.reload);

// }

// exports.style = style;
// exports.watch = watch;
// exports.build = build;
// exports.clean = clean;
// exports.copy = copy;


const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('build', gulp.series('sass'));
gulp.task('default', gulp.series('serve'));
