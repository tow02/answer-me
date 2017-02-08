import 'babel-polyfill';
import 'whatwg-fetch';
import Hello from './Hello.jsx'
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Hello />, document.getElementById('mount'));
