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

const initialIsLoggedIn = false

export const studentLoggedReducer = (state = initialIsLoggedIn, action) => {
    switch(action.type) {
        case 'STUDENT_LOG': {
            if(localStorage.getItem('stoken')) {
                return true
            }else {
                return false
            }
        }
        default: {
            return state
        }
    }
}