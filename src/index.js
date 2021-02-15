import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import './index.css';
import App from './components/App';
import movies from './reducers'

// creating the Redux Store and Passing 'movies' Reducer as argument
const store= createStore(movies); // Here, the Reducers are passed as arguments

console.log("store: ",store);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


