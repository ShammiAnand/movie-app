// // action will be sent to the reducer
// {
//     type: 'ADD_MOVIES',
//         movies: []
// }


// ACTION TYPES
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
export const ADD_FAVOURITES = 'ADD_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';


// ACTION CREATORS
export function addMovies(movies) {
    return {
        type: ADD_MOVIES,
        movies
    }
}

export function addFavourites(movie) {
    return {
        type: ADD_FAVOURITES,
        movie
    }
}

export function handleMovieSearch(movie) {
    // http://www.omdbapi.com/?apikey=13192e46&i=tt2975590&plot=full
    // http://www.omdbapi.com/?apikey=13192e46&
    const url = `http://www.omdbapi.com/?apikey=13192e46&s=${movie}`;
    return function (dispatch) {
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log(movie);

                // dispatch an action
                dispatch(addMovieSearchResult(movie))
            });
    }
}

export function addMovieSearchResult(movie) {
    return {
        type: ADD_SEARCH_RESULT,
        movie
    }
}

export function addMovieToList(movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie
    }
}


export function removeFromFavourite(movie) {
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie
    }
}

export function setShowFavourites(val) { // boolean value
    return {
        type: SET_SHOW_FAVOURITES,
        val // we will pass that value to reducer
    }
}