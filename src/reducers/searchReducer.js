import { UPDATE_SEARCH_STRING } from "../actions/searchStringAction";

export default (state = { data: ''}, action) => {
    switch(action.type) {
        case UPDATE_SEARCH_STRING:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}