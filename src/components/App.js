import React, { Component } from "react";
import Nav from './Nav'
import SearchArea from "./SearchArea";
import MovieList from "./MovieList";
import Pagination from  './Pagination'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchTerm}&api_key=${this.apiKey}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({movies: [...data.results], totalResults: data.total_results })
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchTerm}&api_key=${this.apiKey}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({movies: [...data.results], currentPage: pageNumber})
    })
  }
  
  render(){
    const numberPages = Math.floor(this.state.totalResults / 20);
    
    return (
      <div className="App">
        <Nav />
        <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <MovieList movies = {this.state.movies}/>
        {this.state.totalResults > 20 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : ''}
      </div>
    );
  }
}

export default App;



// function App() {

//   constructor() {
//     super()
//     this.state = {
//       movies: [],
//       searchTerm: ''
//     }
//     this.apiKey = process.env.REACT_APP_API
//   }

//   handleSubmit = () => {
//     fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.searchTerm}&api_key=${this.apiKey}`)
//     .then(data => data.json())
//     .then(data => {
//       console.log(data);
//       this.setState({movies: [...data.results]})
//     })
//   }
  
// handleChange = () => {

// }

//   return (
//     <div className="App">
//       <Nav />
//       <SearchArea handleSubmit={this.handleSubmit}/>
//     </div>
//   );
// }