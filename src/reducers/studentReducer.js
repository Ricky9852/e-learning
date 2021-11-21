const studentInitialState = {
    isLoading: true,
    data: {},
    errors: {}
}

export const studentReducer = ( state = studentInitialState, action) => {
    switch(action.type){
        // case 'SET_ERRORS': {
        //     return {...state, errors: {...action.payload}}
        // }
        case 'GET_STUDENT': {
            return {...state, data: {...action.payload}}
        }
        default: {
            return {...state}
        }
    }
}