import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './site.css';
import '../node_modules/toastr/build/toastr.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
    <Router>
        <App />
    </Router>), document.getElementById('root'));
registerServiceWorker();
