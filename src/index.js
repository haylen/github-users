import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
