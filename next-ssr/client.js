import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './client-component';

const preloadedData = window.__PRELOADED_DATA__;

ReactDOM.hydrate(
    <BrowserRouter>
        <App preloadedData={preloadedData} />
    </BrowserRouter>,
    document.getElementById('root')
);
