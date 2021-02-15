import React from 'react';
// import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { data } from '../data';

class App extends React.Component {
  
  componentDidMount(){
    const { store }= this.props;

    store.subscribe(()=>{   //2. Subscribe takes place after Dispatch, and the Store is Updated
      console.log('Updated');
      this.forceUpdate();   //3. Forces to Re-render the Component, so that the Updated Store is visible on Browser
    });
    //make api call, for now we r not using api to fetch movies, we will be using 'data'

    //dispatch action
    store.dispatch({    // 1. First Dispatch action takes place, then Subscribe
      type:'ADD_MOVIES',
      movies:data,
    });

    console.log('Store: ',store.getState());
  }

  render(){
    const movies= this.props.store.getState();
    console.log('Render');
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favorites</div>
          </div>

          <div className="list">
            {/* {data.map((movie)=>{
              return <MovieCard movie={movie} />      //MovieCard Can also be rendered like this
            })} */}
            {movies.map((movie,index)=>(
              <MovieCard movie={movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
    
  }
  
}

export default App;
