import 'babel-polyfill';
import 'whatwg-fetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App.jsx'

injectTapEventPlugin()

ReactDOM.render((
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>), document.getElementById('mount')
);
