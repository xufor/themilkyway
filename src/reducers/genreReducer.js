import { FETCH_GENRE_DATA } from '../actions/fetchGenreDataAction';
import { APPEND_GENRE_DATA } from '../actions/fetchGenreDataAction';
import { vars } from '../strings';

export const RESET_GENRE_DATA = 'RESET_GENRE_DATA';

export default (state = {}, action) => {
    switch (action.type) {
        case RESET_GENRE_DATA:
            return {};
        case FETCH_GENRE_DATA + vars.f:
            return action.payload.data;
        case APPEND_GENRE_DATA + vars.f:
            return {results: [...state.results].concat(action.payload.data.results)};
        default:
            return state;
    }
}