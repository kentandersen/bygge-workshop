// https://github.com/substack/node-browserify#api-example
// https://github.com/babel/babelify#node
// https://gist.github.com/joyrexus/10026630#transform

const { createWriteStream } = require('fs');
const { join } = require('path');
const browserify = require('browserify');
const uglifyJS = require('./helpers/uglify');

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');
