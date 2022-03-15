const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');

const project = ts.createProject('./tsconfig-server.json');

gulp.task('default', function () {
  const result = project.src().pipe(project());

  return merge([
    result.js.pipe(gulp.dest('dist')),
    result.dts.pipe(gulp.dest('types')),
  ]);
});
