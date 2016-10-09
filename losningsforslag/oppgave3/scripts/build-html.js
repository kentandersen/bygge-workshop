const { join } = require('path');
const { exec } = require('child_process');

const cmd = 'cp src/index.html dist';

exec(cmd, { cwd: join(__dirname, '..') }, function(error, stdout, stderr) {
  console.log(error, stdout, stderr);
});
