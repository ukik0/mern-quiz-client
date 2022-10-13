import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ThemeProvider} from '@mui/material';
import {theme} from './theme';

import {Provider} from 'react-redux';
import {store} from './redux/store';

import {BrowserRouter as Router} from 'react-router-dom';

import './scss/App.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>,
);
