// https://www.npmjs.com/package/node-static

const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('node-static');

const target = join(__dirname, '..', 'dist');

const file = new Server(target);

createServer((request, response) => {
  request.addListener('end', () => file.serve(request, response)).resume();
}).listen(8080);
