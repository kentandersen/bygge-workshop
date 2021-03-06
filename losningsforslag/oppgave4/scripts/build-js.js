// https://github.com/substack/node-browserify#api-example

const { createWriteStream } = require('fs');
const { join } = require('path');
const browserify = require('browserify');
const uglifyJS = require('./helpers/uglify');

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');


browserify(join(source, 'main.js'), {
  transform: [ 'babelify' ]
}).bundle()
  .pipe(uglifyJS())
  .pipe(createWriteStream(join(target, 'main.js')));
