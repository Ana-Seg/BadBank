import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import { UserProvider } from './components/UserContext';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <UserProvider>
     <App />
    </UserProvider>
   </BrowserRouter>

);

