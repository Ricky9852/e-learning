import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureState from './store/configureState';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureState()

store.subscribe( () => {
  console.log('state updated', store.getState())
})


ReactDOM.render(
  <BrowserRouter>
    <Provider store = { store }>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
)