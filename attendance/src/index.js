import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from "react-redux";
import store from './redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} basename={process.env.PUBLIC_URL}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
