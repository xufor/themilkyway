import { UPDATE_SEARCH_STRING } from "../actions/searchStringAction";

export default (state = '', action) => {
    if (action.type === UPDATE_SEARCH_STRING) {
        return action.payload

    } else {
        return state;
    }
}