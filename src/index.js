import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let root = document.getElementById('plugged-root');

if (root) {
  ReactDOM.render(<App />, document.getElementById('plugged-root'));
  registerServiceWorker();
}
