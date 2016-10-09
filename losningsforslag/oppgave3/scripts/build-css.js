const { join } = require('path');
const { exec } = require('child_process');

const cmd = './node_modules/.bin/lessc src/main.less dist/main.css && ./node_modules/.bin/cssnano dist/main.css dist/main.css';

exec(cmd, { cwd: join(__dirname, '..') }, function(error, stdout, stderr) {
  console.log(error, stdout, stderr);
});
