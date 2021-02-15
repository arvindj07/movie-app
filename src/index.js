import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import './index.css';
import App from './components/App';
import movies from './reducers'

// creating the Redux Store and Passing 'movies' Reducer as argument
const store= createStore(movies); // Here, the Reducers are passed as arguments

console.log("store: ",store);
// console.log("Before-State",store.getState()); //getState() gives the State in the Store

//Dispatching the Action by Store, 
//and this Action object is passed to the Reducer(ie, movies. coz its(movies) the argument that we passed to createStore )
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// })

//when the Action is passed to Reducer, the Reducer will return a New-State to the Store and merges it with the curr state
//The updated state can be Read using store.getState()
// console.log("After-State",store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);


