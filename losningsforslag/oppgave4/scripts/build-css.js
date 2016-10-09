// http://lesscss.org/#using-less-usage-in-code
// http://cssnano.co/usage/#javascript
// https://www.npmjs.com/package/es6-promisify

const fs = require('fs');
const { join } = require('path');
const promisify = require('es6-promisify');
const less = require('less');
const { process:minifycss } = require('cssnano');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const render = promisify(less.render.bind(less));

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');

readFile(join(source, 'main.less'))
  .then(file => render(file.toString(), { paths: [source] }))
  .then(({css}) => minifycss(css))
  .then(({css}) => writeFile(join(target, 'main.css'), css))
  .catch(error => console.log(error));
