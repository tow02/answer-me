const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const development = env === 'development';

module.exports = {
  devtool: development ? 'cheap-module-eval-source-map' : 'source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client',
    './client/index.jsx',
  ],
  output: {
    path: __dirname + '/assets',
    filename: 'bundle.js',
    publicPath: '/assets',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
}
