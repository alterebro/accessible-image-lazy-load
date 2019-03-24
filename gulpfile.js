const gulp      = require('gulp');
const babel     = require('gulp-babel');
const uglify    = require('gulp-uglify');
const rename    = require("gulp-rename");
const header    = require('gulp-header');

const pkg = require('./package.json');
const banner = [
  '/*! <%= pkg.name %> v<%= pkg.version %>',
  ' (c) <%= new Date().getFullYear() %> <%= pkg.author %> <%= pkg.homepage %>',
  ' */\n'].join('');

gulp.task('es5-minify', () =>
    gulp.src('src/gandul.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename('gandul.min.js'))
        .pipe(gulp.dest('dist'))
);

gulp.task('es5', () =>
    gulp.src('src/gandul.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify({
        output: {
            comments: false,
            beautify: true
        },
        mangle: false,
        compress: false
    }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', gulp.series('es5', 'es5-minify'));
