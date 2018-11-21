const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageResize = require('gulp-image-resize');
const parallel = require('concurrent-transform');
const os = require('os');


const src = 'src/content/**/*.{JPG,jpg,jpeg,png,PNG}';
const dest = 'src/assets';

gulp.task('guetzli', () =>
  gulp.src(src)
  .pipe(imagemin([
    imageminJpegtran(),
    imageminGuetzli({
      quality: 85
    })
  ]))
  .pipe(gulp.dest(dest))
);

gulp.task('mozjpeg', () =>
  gulp.src(dest)
  .pipe(imagemin([
    imageminJpegtran(),
    imageminMozjpeg({
      quality: 75
    })
  ]))
  .pipe(gulp.dest(dest))
);

gulp.task('thumbnails', function () {
  gulp.src(src)
    .pipe(
      imageResize({ width : 200 })
    )
    .pipe(imagemin([
      imageminJpegtran(),
      imageminMozjpeg({
        quality: 75
      })
    ]))
    .pipe(gulp.dest(dest));
});
