import React from 'react';

import { handleMovieSearch ,addMovieToList } from '../actions';
// import { data } from '../data';


class Navbar extends React.Component{ 
  constructor(props){
    super(props);

    this.state={
      searchText:'',
    }
  }

  handleAddToMovies=(movie)=>{
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      showSearchResults:false,
    });
  }

  handleSearch=()=>{
    const { searchText  }=this.state; 

    this.props.dispatch(handleMovieSearch(searchText)); // To fetch the resultpi and store it in the Redux 'Store'
  }

  handleChange=(e)=>{     // we will get The Event Object as an Argument
    this.setState({
      searchText:e.target.value,  // getting the value Entered at the 'input' tag
    });
  }

  render(){
    const { result:movie, showSearchResults } = this.props.search; // re-naming 'result' into 'movie' while de-structuring
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange}  />
          <button id="search-btn" onClick={this.handleSearch}>Search</button>

          {showSearchResults && 
            <div className="search-results">
              <div className="search-result">
                <img  src={movie.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={()=>this.handleAddToMovies(movie)}>
                    Add To Movies
                  </button>
                </div>
              </div>
             </div>
          
          }
        </div>
      </div>
    );
  }
  
}

export default Navbar;
