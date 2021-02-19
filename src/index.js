import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';   // importing the combineReducer from ./reducers (which is exported by default)

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
  //logger code
  if(typeof action !== 'function'){
    console.log('ACTION_TYPE: ',action.type);
  }
  next(action); // Here ,this next() func calls the dispatch func
}

// This is the exact code in the 'thunk' package
// 'thunk' Middleware is Used to check if the Action returned from Action-creator is a Function
// const thunk = ({ dispatch,getState })=> (next)=> (action)=>{
//   if(typeof action === 'function'){
//     action(dispatch);   // if the action is a func, then we pass 'dispatch' value to the argument of 'action()'
//     return;  
//   }
//   next(action); // if the 'action' is not a Func, then we return the action Object to the reducer
// }

// creating the Redux Store and Passing 'rootReducer' Reducer as argument
const store= createStore(rootReducer,applyMiddleware(logger,thunk)); // Here, the Reducers are passed as arguments. It takes only one reducer

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

//Creating Context, for the Store to be available to all the nested/child components
export const StoreContext = createContext();
console.log('StoreContext: ',StoreContext);

class Provider extends React.Component{
  render(){
    const { store }=this.props; // gets store from props

    // this.props.children renders all the Component wrapped in <Provider> component in RenderDOM
    // if the element in value={} (eg. here its 'store') changes, then the App component and all its decendants who r using the value 'store' will get re-rendered ,i.e, all the Child-Components with Consumer will get re-rendered 
    return <StoreContext.Provider value={store}>  
      {this.props.children} 
    </StoreContext.Provider>
  };
}

// const connectedAppComponent=connect(callback)(App);
// Defining connect() func
export function connect(callback){
  return function (Component){
    
    class ConnectedComponent extends React.Component{
      constructor(props){
        super(props);
        //as whatever Component we r connecting to the Store should automatically re-render whenever the state changes,
        // We use store.subscribe, and we get 'Store' from Wrapper as props
        this.unsubscribe =this.props.store.subscribe( ()=>{this.forceUpdate();} );
      }

      componentWillUnmount(){
        //to prevent memory-leakes when the current Component gets Destroyed, we use unsubscribe func.
        //we call unsubscribe() within -> componentWillUnmount() ie., after the Component is Destroyed
        this.unsubscribe();
      }

      render(){ 
        // to pass the props(,i.e, movies, search ) to the Component using callback func,
        const {store} = this.props;
        const state= store.getState();                  // to get {movies, search } from store
        const dataToBePassedAsProps = callback(state); // this callback func will return an obj. Refer to func 
                                                      //definition of callback func in App.js

        return <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />//passing dispatch as prop by default
                                                  // {...dataToBePassedAsProps}- using Spreading Property
                                                  //which is similar to <Component movies={movies} search={search} />
                
      }
    }

    class ConnectedComponentWrapper extends React.Component{
      render(){
        return(
          //We r wrapping the Component coz, we want ConnectedComponent to have 'store' as props to render subscribe()  
          // inside the constructor
          <StoreContext.Consumer>
            {(store)=> <ConnectedComponent store={store} />} 
          </StoreContext.Consumer>
        );
      }
    }

    //  returning the Component ( as connect() returns a Component )
    return ConnectedComponentWrapper;

  }
}

// {/* Passing 'store' as value in StoreContext.Provider to be accessed by App component*/}
// {/* We r wrapping App component by StoreContext.Provider, so that, 'store' is available to App as well as its decendant by just using StoreContext.Consumer Property and not passing props through all intermediate elements */}
ReactDOM.render(
  <React.StrictMode>
    {/* Passing store as Props to Provider Class Component */}
    <Provider store={store}>  
      <App        
        // store={store} // Passing store as props
      />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);


