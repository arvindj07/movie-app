import { ADD_FAVOURITE, ADD_MOVIES } from '../actions';

const initialMoviesState= {
  list:[],
  favourites:[],
}

export default function movies(state= initialMoviesState, action){
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
        ...state,         
        list:action.movies,
      }
    case ADD_FAVOURITE:
      return {
        ...state,         
        favourites:[action.movie,...state.favourites],  // adding the favourite movie at the first idx and spread all the 
                                                        //rest of the movies in my favourites array
      }
    default:
      return state;
  }  
 
}

