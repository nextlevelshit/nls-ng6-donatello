const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminJpegtran = require('imagemin-jpegtran');
const imageResize = require('gulp-image-resize');
// const parallel = require('concurrent-transform');
// const os = require('os');
const rename = require('gulp-rename');
const log = require('fancy-log');

const src = 'src/content/**/*.{JPG,jpg,jpeg,png,PNG}';
const dest = 'src/assets';
const breakpoints = [1800, 1200, 800, 640, 320];

module.exports.breakpoints = breakpoints;

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

gulp.task('thumbnails', () =>
  breakpoints.forEach(breakpoint => {
    gulp.src(src)
    .pipe(imageResize({
			width: breakpoint,
			imageMagick: true
		}))
    .on('end', () => log('Finished Resizing for breakpoint', breakpoint))
    .pipe(rename({suffix: `@${breakpoint}w`}))
    .on('end', () => log('Finished Renaming for breakpoint', breakpoint))
    .pipe(imagemin([
      imageminJpegtran(),
      imageminMozjpeg({
        quality: 75
      })
    ]))
    .on('end', () => log('Finished Compression for breakpoint', breakpoint))
    .pipe(gulp.dest(dest))
    .on('end', () => log('Finished Copying for breakpoint', breakpoint))
  })
);
