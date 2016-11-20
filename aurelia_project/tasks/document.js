import gulp from 'gulp';
import hologram from 'gulp-hologram';
import project from '../aurelia.json';

export default function document() {
  return gulp.src('hologram.yml')
          .pipe(hologram());
}

