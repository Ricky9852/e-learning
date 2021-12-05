const lecturesInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const studentLecturesReducer = ( state = lecturesInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'GET_STUDENTLECTURES': {
            return {...state, data: [...action.payload]}
        }
        default: {
            return {...state}
        }
    }
}