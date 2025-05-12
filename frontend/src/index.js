import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="592269678956-fa7rq08ma0nkbvra5cek1n6oqr8ib3tp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
); 