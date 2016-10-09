const fs = require('fs');
const { createServer } = require('http');
const { join } = require('path');
const { createReadStream, createWriteStream } = fs;

const less = require('less');
const { process:minifycss } = require('cssnano');
const browserify = require('browserify');
const uglifyJS = require('./helpers/uglify');
const { Server } = require('node-static');

const promisify = require('es6-promisify');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const render = promisify(less.render.bind(less));

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');

let tasks = {};

function addTask(name, func) {
  tasks[name] = func;
}

function runTask(name) {
  const task = tasks[name];
  if(typeof task === 'function') {
    console.log(`Running ${name}...`);
    task();
  } else {
    console.log(`No task named ${name}`);
  }
}


/**
 * Definer tasks her!
 */

addTask('html', () => {
  createReadStream(join(source, 'index.html')).pipe(createWriteStream(join(target, 'index.html')));
});

addTask('css', () => {
  readFile(join(source, 'main.less'))
    .then(file => render(file.toString(), { paths: [source] }))
    .then(({css}) => minifycss(css))
    .then(({css}) => writeFile(join(target, 'main.css'), css))
    .catch(error => console.log(error));
});

addTask('js', () => {
  browserify(join(source, 'main.js'), {
    transform: [ 'babelify' ]
  }).bundle()
    .pipe(uglifyJS())
    .pipe(createWriteStream(join(target, 'main.js')));
});

addTask('serve', () => {
  const file = new Server(target);

  createServer((request, response) => {
    request.addListener('end', () => file.serve(request, response)).resume();
  }).listen(8080);
});


let [,,...tasksToRun] = process.argv;

if(tasksToRun.length === 0) {
  tasksToRun = Object.keys(tasks);
}

tasksToRun.forEach(taskName => runTask(taskName));
