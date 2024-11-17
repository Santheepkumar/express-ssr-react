import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Hydration: Hydrating the pre-rendered HTML

// Get initial data from the server-rendered HTML
const data = JSON.parse(document.getElementById("initial-data").textContent);

ReactDOM.hydrate(<App data={data.data}/>, document.getElementById('root'));
