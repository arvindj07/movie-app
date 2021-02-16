import React from 'react';
import {  data  } from '../data';
import { handleMovieSearch ,addMovieToList } from '../actions';

class Navbar extends React.Component{ 
  constructor(props){
    super(props);

    this.state={
      showSearchResults:true,
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

    this.props.dispatch(handleMovieSearch(searchText)); // To fetch the data from Api and store it in the Redux 'Store'
  }

  handleChange=(e)=>{     // we will get The Event Object as an Argument
    this.setState({
      searchText:e.target.value,  // getting the value Entered at the 'input' tag
    });
  }

  render(){
    const { showSearchResults } = this.state;
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange}  />
          <button id="search-btn" onClick={this.handleSearch}>Search</button>

          {showSearchResults && 
            <div className="search-results">
              <div className="search-result">
                <img  src={data[0].Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{data[0].Title}</span>
                  <button onClick={()=>this.handleAddToMovies(data[0])}>
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
