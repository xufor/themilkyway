import { UPDATE_SEARCH_STRING } from "../actions/searchStringAction";

export default (state = { data: ''}, action) => {
    if (action.type === UPDATE_SEARCH_STRING) {
        return {
            data: action.payload
        };
    } else {
        return state;
    }
}