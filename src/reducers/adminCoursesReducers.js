const coursesInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const adminCoursesReducer = ( state = coursesInitialState, action) => {
    switch(action.type){
        // case 'SET_ERRORS': {
        //     return {...state, errors: {...action.payload}}
        // }
        case 'ADD_COURSES': {
            return {...state}
        }
        case 'GET_ADMINCOURSES': {
            return {...state, data: [...action.payload]}
        }
        default: {
            return {...state}
        }
    }
}