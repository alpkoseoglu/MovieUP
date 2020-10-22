
const AppReducer = (state, action) => {
    switch(action.type) {
        case "ADD_MOVIE_TO_FAVORITES":
            return {
                ...state,
                favoritesList: [action.payload, ...state.favoritesList]
            }
        case "UPDATE_RESULTS_LIST":
            return {
                ...state,
                searchResultsList: [action.payload]
            }
        case "GET_ALL_MOVIES":
            return {
                ...state,
                searchResultsList: [action.payload]
            }
        default:
            return state
    }
}

export default AppReducer