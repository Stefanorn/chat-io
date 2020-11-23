import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserProvider from './providers/UserProvider';
import { createStore } from 'redux';
import App from './components/App';
import '../styles/site.css';

ReactDOM.render(
    <Provider 
        store={createStore(UserProvider)}>
            <Router>
                <App />
            </Router>
    </Provider>,
    document.getElementById('app')
);