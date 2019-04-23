import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactApplication from './boot/setup';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ReactApplication />, document.getElementById('root'));

serviceWorker.unregister();
