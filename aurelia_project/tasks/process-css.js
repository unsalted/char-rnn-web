import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import sourcemaps from 'gulp-sourcemaps';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import rupture from 'rupture'; //mediaquery
import kouto from 'kouto-swiss'; //everything else
import jeet from 'jeet'; //everything else
import typographic from 'typographic'
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass: true}))
    .pipe(sourcemaps.init())
    .pipe(stylus({use: [rupture(), kouto(), jeet(), typographic()]}))
    .pipe(autoprefixer({
        browsers: ['> 5%','last 2 versions'],
        cascade: false
    }))
    .pipe(build.bundle());
}
