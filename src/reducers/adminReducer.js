const adminInitialState = {
    isLoading: true,
    data: {},
    errors: {}
}

export const adminReducer = ( state = adminInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_ADMIN': {
            return {...state}
        }
        case 'EDIT_ADMIN': {
            return {...state, data: {...action.payload}}
        }
        case 'GET_ADMIN': {
            return {...state, data: {...action.payload}}
        }
        default: {
            return {...state}
        }
    }
}

const initialIsLoggedIn = false

export const loggedReducer = (state = initialIsLoggedIn, action) => {
    switch(action.type) {
        case 'LOGGED': {
            if(localStorage.getItem('token')) {
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