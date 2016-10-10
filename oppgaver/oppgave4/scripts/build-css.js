// http://lesscss.org/#using-less-usage-in-code
// http://cssnano.co/usage/#javascript
// https://www.npmjs.com/package/es6-promisify

const fs = require('fs');
const { join } = require('path');
const promisify = require("es6-promisify");

const less = require('less');
const { process:minifycss } = require('cssnano');

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');
