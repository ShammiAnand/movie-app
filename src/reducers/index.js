import { act } from 'react-dom/test-utils';
import { ADD_MOVIES, ADD_FAVOURITES, REMOVE_FROM_FAVOURITES, SET_SHOW_FAVOURITES } from '../actions';

const initialMovieState = {
    list: [],
    favourites: [],
    showFavourites: false
}

export default function movies(state = initialMovieState, action) {
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

