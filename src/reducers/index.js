import { ADD_TO_FAVOURITES, ADD_MOVIES,REMOVE_FROM_FAVOURITES,SET_SHOW_FAVOURITES } from '../actions';

// the STATE OBJECT in the STORE
const initialMoviesState= {
  list:[],
  favourites:[],
  showFavourites:false,
}

//reducer function returns a new State object, as it cant make changes in the current state

export function movies(state= initialMoviesState, action){
  console.log('MOVIE REDUCER');
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

    default:
      return state;
  }  
 
}

const initialSearchState={
  result:{}
};
export function search(state=initialSearchState,action){
  console.log('Search REDUCER');
  return state;
}


const initialRootState={
  movies:initialMoviesState,
  search:initialSearchState,
};
export default function rootReducer(state=initialRootState,action){
  return {
    movies:movies(state.movie,action),  // Passing the corresponding state ie., state.movie
    search:search(state.search,action),
  }
}

