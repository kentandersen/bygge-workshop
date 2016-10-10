var { join } = require('path');

const source = join(__dirname, 'src');
const target = join(__dirname, 'dist');

module.exports = {
  entry: join(source, 'main.js'),
  output: {
    path: target,
    filename: 'main.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      include : src,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    }]
  }
};
