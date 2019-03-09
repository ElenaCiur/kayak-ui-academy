import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      results: {},
      searchValue: ''
    }
  }
  
  async loadMovies(searchValue) {
    if (searchValue.length < 3) return
    
    var newResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=${searchValue}&page=1&include_adult=false`)
    
    this.setState({
      results: newResults.data.results
    })
  }
  
  render() {
    return (
      <div> 
        <div 
          style={{
            backgroundColor: '#F66B27',
            padding: '20px',
            display: 'flex'
          }}
        >
          <input
            value={this.state.searchValue}
            onChange={(event) => {
              this.setState({ searchValue: event.target.value})
              this.loadMovies(event.target.value)
            }}
            placeholder='Enter movie name'
            style={{
              backgroundColor: 'orange',
              padding: '10px',
              border: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          /> 
          <button
            onClick={() => this.loadMovies(this.state.searchValue)}
            style={{
              backgroundColor: 'white',
              color: 'orange',
              border: 'none',
           }}
          > 
            Search
          </button>
        </div>
        
        {_.map(_.take(this.state.results, 8), (movie) => (
          <div
            onClick={() => this.setState({ searchValue: movie.title })}
            style={{
              backgroundColor: '#F6F7FA',
              margin: '10px',
              width: '30%'
            }}
          >
            <div>
              {movie.title}
            </div>
            <div>
              {movie.release_date}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
