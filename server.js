const express = require('express');
const webpack = require('webpack');
const morgan = require('morgan');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function makeApp() {
  const app = express()

  const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

  if (env === 'development') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: { chunks: false, errors: true }
    }));
    app.use(webpackHotMiddleware(compiler));
  } else {
    app.use('/assets/', express.static('assets'));
  }

  if (env !== 'test') app.use(morgan('combined'))

  app.use('/time', (req, res) => {
    res.json({
      time: new Date().getTime()
    });
  });

  app.use(express.static('static'));

  app.use('*', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
  });

  return app
}

module.exports = makeApp

if (require.main === module) {
  const app = makeApp()
  app.listen(3000, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:3000');
  })
}
