import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureState from './store/configureState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const store = configureState()

store.subscribe( () => {
  console.log('state updated', store.getState())
})

// document.body.style.background = " url('https://www.teahub.io/photos/full/35-353578_university-and-school-education-concept-with-e-learning.jpg') no-repeat "; 

ReactDOM.render(
  <BrowserRouter>
    <Provider store = { store }>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
)