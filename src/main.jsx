
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.jsx';

// Убедитесь, что вызов createRoot происходит только один раз
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);