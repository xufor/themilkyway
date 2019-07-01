export default (state = '', action) => {
    if (action.type === 'SET_TARGET_UID') {
        return action.payload;
    } else {
        return state;
    }
}