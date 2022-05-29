import { act } from 'react-dom/test-utils';
import { combineReducers } from 'redux';
import { ADD_MOVIES, ADD_FAVOURITES, REMOVE_FROM_FAVOURITES, SET_SHOW_FAVOURITES } from '../actions';

// ------------------------------------------------------------------------------------------------------------------------------
const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false
}

export function movies(state = initialMovieState, action) {
    // if (action.type === 'ADD_MOVIES') {
    //     return {
    //         ...state,
    //         list: action.movies
    //     };
    // }
    // return state;
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state, // spread operator (copies the object)
                list: action.movies // update key of the copied object
            }
        case ADD_FAVOURITES:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites] // add the new favourite movie in the beginning
            }
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourites.filter(
                movie => movie.title !== action.movie.title
            );

            return {
                ...state,
                favourites: filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites: action.val
            }
        default:
            return state;
    }
}
// ------------------------------------------------------------------------------------------------------------------------------

const initialSearchState = {
    result: {}
};

export function search(state = initialSearchState, action) {
    return state;
}

// combining the reducers to form one root reducer
// later if we wish to add user functionality, it can be done
// by adding user reducer here

const initialRootState = {
    movies: initialMovieState,
    search: initialSearchState
}

export default function rootReducer(state = initialRootState, action) {
    return {
        movies: movies(state.movies, action), // movies should be managed by movies reducer
        search: search(state.search, action) // search should be managed by search reducer
    }
}

// export default combineReducers({
//     movies: movies,
//     search: search
// })












