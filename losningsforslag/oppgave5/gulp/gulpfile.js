const { join } = require('path');

const gulp = require('gulp');
const serve = require('gulp-serve');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const browserify = require('browserify');
const sourceStream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const source = join(__dirname, 'src');
const target = join(__dirname, 'dist');

gulp.task('html', () => {
  return gulp.src(join(source, 'index.html')).pipe(gulp.dest(target));
});

gulp.task('js', () => {
  return browserify(join(source, 'main.js'), {
    transform: [ 'babelify' ]
  })
    .bundle()
    .pipe(sourceStream('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(target));
});

gulp.task('css', () => {
  return gulp.src(join(source, 'main.less'))
    .pipe(cssnano())
    .pipe(gulp.dest(target));
});

gulp.task('serve', serve(target));

gulp.task('default', ['html', 'css', 'js']);
