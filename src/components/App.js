import React from 'react';
import Navbar from './Navbar'; // here we r actually receiving NavbarWrapper Comp. as its exported by default
import MovieCard from './MovieCard';
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions';
import { StoreContext , connect } from '../index'; // importing this to use the Context Property

class App extends React.Component {
  
  componentDidMount(){
   
    // // Its a Listener
    // store.subscribe(()=>{   //2. Subscribe takes place after each Dispatch, and the Store is Updated
    //   console.log('Updated');
    //   this.forceUpdate();   //3. Forces to Re-render the Component, so that the Updated Store is visible on Browser
    // });
    //make api call, for now we r not using api to fetch movies, we will be using 'data'

    //dispatch action, it calls the REDUCERS
    //here we r adding the data-of movies to the store(i.e, the state changes) using REDUCERS
    this.props.dispatch(addMovies(data));// 1. First Dispatch action takes place, then Subscribe coz dispatch() call usually 
                                    //triggers the listener again.

  }

  //to check whether a particular movie is in favourites or not
  isMovieFavourite=(movie)=>{
    const { movies } =this.props;

    const index= movies.favourites.indexOf(movie);
    if(index !== -1){
      return true;  // found the movie
    }

    return false;
  }

  onChangeTab=(val)=>{
    this.props.dispatch(setShowFavourites(val));
  }

  render(){
    const { movies, search }= this.props; // contains-> { movies:{}, search{} }
    const { list, favourites, showFavourites }= movies;
    const displayMovies = showFavourites?favourites:list;

    return (
      <div className="App">
        <Navbar 
          search={search} // This search prop is actually passed to NavbarWrapper Comp. instead of Navbar Comp.
                          //To know more, chk the top of this file ,where Navbar is imported
        />  
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
                dispatch={this.props.dispatch} 
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

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       // StoreContext.Consumer element expects a function as its child(i.e, inside it)
//       <StoreContext.Consumer>
//         {(store)=> <App store={store} />     // This is the function which Consumer expects and it returns App compnent
//                           // ->Here we get 'store' from Context-Provider,when this call-back func is called internally 
//                                 //  ->Here We r passing 'store' as props to App Comp.        
//         }
//       </StoreContext.Consumer>
//     );
//   }
// }

// This callback func specifies the kind of data required by the Component(eg: here its 'movie' nd 'search')
// here, state is the 'store' from Redux-store
function callback(state){
  return{                //These elements(ie,'movie' nd 'search') would be the props of the connected Component(i.e,App)
    movies:state.movies,
    search:state.search,
  }
}

// Whenerver we want to Connect our Component to Redux-Store we use conect().
//connect() return a new React Component
//By Default- whatever Components r connected to the Store using connect(), we pass dispatch() as props to that particular Component(eg, App here ) by Default
// Whatever Component is connected, only that Comp. gets refreshed/re-rendered when that particular prop changes(i.e, in this case if props like movies or search Changes, then App Comp. will get re-rendered)

const connectedAppComponent=connect(callback)(App); //1st arg is callback func, 
                                  //2nd Arg is the Component that is to be connected with the Redux-store(i.e, App)

export default connectedAppComponent ; 