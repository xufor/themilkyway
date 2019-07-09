import { FETCH_SEARCH_DATA } from '../actions/fetchSearchDataAction';
import { APPEND_SEARCH_DATA } from '../actions/fetchSearchDataAction';
import { vars } from '../strings';

export const RESET_SEARCH_CONTENT = 'RESET_SEARCH_CONTENT';

export default (state = {}, action) => {
    switch (action.type) {
        case RESET_SEARCH_CONTENT:
            return {};
        case FETCH_SEARCH_DATA + vars.f:
            return action.payload.data;
        case APPEND_SEARCH_DATA + vars.f:
            return {results: [...state.results].concat(action.payload.data.results)};
        default:
            return state;
    }
}