import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages';
import Amplify from 'aws-amplify'
import config from './aws-exports.js'
Amplify.configure(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
