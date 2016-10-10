const { createReadStream, createWriteStream } = require('fs');
const { join } = require('path');

const source = join(__dirname, '..', 'src');
const target = join(__dirname, '..', 'dist');
