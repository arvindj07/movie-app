//action objects
// {
//   type:'ADD_MOVIES',
//   movies: [m1,m2,m3]
// }



//  action types
export const ADD_MOVIES='ADD_MOVIES';
export const ADD_TO_FAVOURITES='ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES='REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';

//  action creators
export function addMovies(movies){
  return {    
    type:ADD_MOVIES,
    movies:movies,
  }
}

export function addFavourite(movie){
  return {    
    type:ADD_TO_FAVOURITES,
    movie:movie,
  }
}

export function removeFromFavourites(movie){
  return {    
    type:REMOVE_FROM_FAVOURITES,
    movie:movie,
  }
}

export function setShowFavourites(val){
  return {    
    type:SET_SHOW_FAVOURITES,
    val:val,
  }
}

export function addMovieToList(movie){
  return {    
    type:ADD_MOVIE_TO_LIST,
    movie:movie,
  }
}

// This action creator return a function instead of an Object, which is handled by 'Thunk' Middleware in index.js-src
export function handleMovieSearch(movie){
  const url=`http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;  // url to the Api

  return function(dispatch){
    fetch(url)
    .then(response=> response.json())   // to get the response in json format
    .then(movie => {
      console.log('Movie: ',movie);

      //dispatch an action, ie, the action just below this one
      dispatch(addMovieSearchResult(movie))
    })
  } 
}  

export function addMovieSearchResult(movie){
  return{
    type:ADD_SEARCH_RESULT,
    movie:movie
  }
} 