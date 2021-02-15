import { ADD_MOVIES } from '../actions';

const initialMoviesState= {
  list:[],
  favourites:[],
}

export default function movies(state= initialMoviesState, action){
  if(action.type===ADD_MOVIES){
    return {
      ...state,         //spread operator to copy all properties of 'state' object into a new obj,(not shallow copy)
      list:action.movies, // update the 'list' property with action.movies array
    }
  }
  
  return state;
}

