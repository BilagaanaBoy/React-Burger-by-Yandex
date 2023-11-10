import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
 import App from './components/App/App';

import { Provider } from 'react-redux';
import { initialiseStore } from './services/store';
// import reportWebVitals from './components/App/reportWebVitals';
//import reportWebVitals from '/React/react-burger/src/components/App/reportWebVitals';

const store = initialiseStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

