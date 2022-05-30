import React from "react";
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import { data } from '../data';
import { addMovies, addFavourites, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      // after dipatch this callback function will be called
      // console.log('UPDATED');
      this.forceUpdate(); // re render our whole App component
    });

    // make api call
    // dispatch action
    // store.dispatch(addMovies(data));

    console.log('STATE', store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();  // {movies:{}, search:{}}
    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    // redux store's default state is being passed to App component via props from src>index.js
    const { movies, search } = this.props.store.getState();  // {movies:{}, search:{}}
    const { list, favourites, showFavourites } = movies;
    console.log('RENDER', this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App" >
        <Navbar dispatch={this.props.store.dispatch} search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {/* data can be used to show all movies in the data.js */}
            {displayMovies.map((movie, index) => (
              // unique key for every movie
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {
            displayMovies.length === 0
              ? <div className="no-movies">No movies to display</div>
              : null
          }
        </div >
      </div >
    );
  }
}

export default App;
