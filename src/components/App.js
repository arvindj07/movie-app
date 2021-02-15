import React from 'react';
// import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions';

class App extends React.Component {
  
  componentDidMount(){
    const { store }= this.props;

    // Its a Listener
    store.subscribe(()=>{   //2. Subscribe takes place after Dispatch, and the Store is Updated
      console.log('Updated');
      this.forceUpdate();   //3. Forces to Re-render the Component, so that the Updated Store is visible on Browser
    });
    //make api call, for now we r not using api to fetch movies, we will be using 'data'

    //dispatch action
    //here we r adding the data-of movies to the store(i.e, the state changes)
    store.dispatch(addMovies(data));// 1. First Dispatch action takes place, then Subscribe coz dispatch() call usually 
                                    //triggers the listener again.

    console.log('Store: ',store.getState());
  }

  //to check whether a particular movie is in favourites or not
  isMovieFavourite=(movie)=>{
    const { favourites } =this.props.store.getState();

    const index= favourites.indexOf(movie);
    if(index !== -1){
      return true;  // found the movie
    }

    return false;
  }

  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val));
  }

  render(){
    const { list, favourites, showFavourites }= this.props.store.getState();
    console.log('Render',this.props.store.getState());
   
    const displayMovies = showFavourites?favourites:list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites? '':'active-tabs'}`} onClick={()=> this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites? 'active-tabs':''}`} onClick={()=> this.onChangeTab(true)}>Favorites</div>
          </div>

          <div className="list">
            {/* {data.map((movie)=>{
              return <MovieCard movie={movie} />      //MovieCard Can also be rendered like this
            })} */}
            {displayMovies.map((movie,index)=>(
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch} 
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          
          {displayMovies.length ===  0 ? <div className="no-movies">No Movies To Display! </div> : null}
    
        </div>
      </div>
    );
    
  }
  
}

export default App;
