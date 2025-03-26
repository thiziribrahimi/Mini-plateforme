import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ton CSS perso
import App from './App';

// 👉 Ces deux lignes sont essentielles pour que Bootstrap fonctionne correctement
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ C’est ici que tu le mets

import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
