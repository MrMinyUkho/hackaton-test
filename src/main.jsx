import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <Login/>
      <Register/>
  </StrictMode>,
)
