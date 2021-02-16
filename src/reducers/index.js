import { combineReducers } from 'redux'; // Built-In root-Reducer

import { 
        ADD_TO_FAVOURITES, 
        ADD_MOVIES,
        REMOVE_FROM_FAVOURITES,
        SET_SHOW_FAVOURITES,
        ADD_MOVIE_TO_LIST,
        ADD_SEARCH_RESULT 
      } from '../actions';


const initialMoviesState= { // the STATE OBJECT in the STORE
  list:[],
  favourites:[],
  showFavourites:false,
}

//reducer function returns a new State object, as it cant make changes in the current state

//   Movies reducer
export function movies(state= initialMoviesState, action){
  // console.log('MOVIE REDUCER');

  // if(action.type===ADD_MOVIES){
  //   return {
  //     ...state,         //spread operator to copy all properties of 'state' object into a new obj,(not shallow copy)
  //     list:action.movies, // update the 'list' property with action.movies array
  //   }
  // }
  // return state;

  switch (action.type){
    case ADD_MOVIES:
      return {
        ...state,         //spread operator to copy all properties of 'state' object into a new obj,(not shallow copy)
        list:action.movies, // update the 'list' property with action.movies array
      }
    case ADD_TO_FAVOURITES:
      return {
        ...state,         
        favourites:[action.movie,...state.favourites],  // adding the favourite movie at the first idx and spread all the 
                                                        //rest of the movies in my favourites array
      }
    case REMOVE_FROM_FAVOURITES:
      // getting all the movies except the one in action.movie from state.favourites
      const filteredArray = state.favourites.filter(
        (movie)=> movie.Title !== action.movie.Title
      );

      return {
        ...state,         
        favourites:filteredArray,
      }
    
    case SET_SHOW_FAVOURITES:
      return{
        ...state,
        showFavourites:action.val,
      }

    case ADD_MOVIE_TO_LIST:
      return{
        ...state,
        list:[action.movie ,...state.list],
      };

    default:
      return state;
  }  
 
}


const initialSearchState={
  result:{},
  showSearchResults:false,
};

// Search Reducer
export function search(state=initialSearchState,action){
  // console.log('Search REDUCER');
  switch (action.type){
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result:action.movie,  
        showSearchResults:true
      }
    
    //as on dispatch() all the reducers r called, this action can be called in search reducer also
    case ADD_MOVIE_TO_LIST: 
      return{
        ...state,
        showSearchResults:false,
      };
  
    
    default:
      return state;
  }
  
  
}


// const initialRootState={
//   movies:initialMoviesState,
//   search:initialSearchState,
// };
// export default function rootReducer(state=initialRootState,action){
//   return {
//     movies:movies(state.movies,action),  // Passing the corresponding state ie., state.movie
//     search:search(state.search,action),
//   }
// }

// Built-In RootReducer which is used to Combine the REDUCERS
//here, 'movies' and 'search' are the properties of the state object Returned by this combineReducer, just like-> list, favourites , showFavourites properties in 'movies' REDUCER


// Combined reducer
export default combineReducers({
  movies:movies,                // defining its movies property with movies Reducer
  search: search,               // Same as above
})

