import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
