import React from "react";
// import { data } from '../data';
import { addMovieToList, handleMovieSearch } from '../actions';
import { search } from "../reducers";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }
    handleAddToMovies = (movie) => {
        // to get the full plot
        const url = `http://www.omdbapi.com/?apikey=13192e46&i=${movie.imdbID}&plot=full`;
        fetch(url)
            .then(response => response.json())
            .then(Movie => {
                console.log(Movie);

                // dispatch an action
                // dispatch(addMovieSearchResult(movie))
                this.props.dispatch(addMovieToList(Movie));
                this.setState({
                    showSearchResults: false,
                })
            });
        // this.props.dispatch(addMovieToList(movie));
        // this.setState({
        //     showSearchResults: false,
        // })
    }
    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    handleSearch = () => {
        const { searchText } = this.state;
        this.props.dispatch(handleMovieSearch(searchText));
        // console.log(searchText);
    }
    render() {
        // const { showSearchResults } = this.state;
        const { result, showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange} placeholder='type the name of the movie and click search' />
                    <button id="search-btn" onClick={this.handleSearch}>search</button>
                    {showSearchResults &&
                        <div className="search-results">
                            {result.Search.map((movie, index) => (
                                // unique key for every movie
                                <div className="search-result">
                                    <img src={movie.Poster} alt='search-pic' />
                                    <div className="movie-info">
                                        <span>{movie.Title}</span>
                                        <div className="search-button-container">
                                            <button className="add_movie_btn" onClick={() => this.handleAddToMovies(movie)}>add to list</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="search-result">
                                <img src={result.Poster} alt='search-pic' />
                                <div className="movie-info">
                                    <span>{result.Title}</span>
                                    <button className="add_movie_btn" onClick={() => this.handleAddToMovies(result)}>add to list</button>
                                </div>
                            </div> */}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Navbar;
