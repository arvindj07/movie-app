import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// Middleware 
// curried form of function logger(obj,next,action)  'obj' object is de-contructed to {dispatch, getState}
// const logger= function({ dispatch,getState }){
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log('ACTION_TYPE: ',action.type);
//       next(action);       //used to call the next middleWare or the dispatch func in this case
//     }
//   }
// }

// The MiddleWare can also be written like this
const logger = ({ dispatch,getState })=> (next)=> (action)=>{
  console.log('ACTION_TYPE: ',action.type);
  next(action); // Here ,this next() func calls the dispatch func
}

// creating the Redux Store and Passing 'rootReducer' Reducer as argument
const store= createStore(rootReducer,applyMiddleware(logger)); // Here, the Reducers are passed as arguments. It takes only one reducer

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
    <App 
      store={store} // Passing store as props
    />
  </React.StrictMode>,
  document.getElementById('root')
);


