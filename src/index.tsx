import React from 'react';
import ReactDOM from 'react-dom/client';
import localforage from 'localforage';
import '@/styles/index.sass';
import router from '@/router';
import store from '@/redux';
import App from '@/App';

// configure the localforage lib as persistence for search history
localforage.config({
  name: 'pokedex',
  storeName: 'keyvaluepairs',
});

const root = document.getElementById('root');
if (!root) throw new Error('No root element found!');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App store={store} router={router} />
  </React.StrictMode>,
);
