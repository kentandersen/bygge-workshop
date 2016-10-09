const { join } = require('path');
const { exec } = require('child_process');

const cmd = './node_modules/.bin/browserify -e src/main.js -o dist/main.js -t babelify && ./node_modules/.bin/uglifyjs dist/main.js -o dist/main.js';

exec(cmd, { cwd: join(__dirname, '..') }, function(error, stdout, stderr) {
  console.log(error, stdout, stderr);
});
