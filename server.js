const express = require('express');
const webpack = require('webpack');
const morgan = require('morgan');
const path = require('path')

const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function makeApp() {
  const app = express()
  const api = express()

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

  app.use('/static', express.static('static'));

  if (env !== 'test') app.use(morgan('combined'))

  api.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/images/01-hall-of-bulls.png'))
  })

  app.use('/api', api)

  app.use('/time', (req, res) => {
    res.json({
      time: new Date().getTime()
    });
  });

  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'))
  });

  app.use((err, req, res, next) => {
    console.log(JSON.stringify(err, null, 2))
    if (err.stack) {
      console.log(err.stack)
    }
    res.sendStatus(500)
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
