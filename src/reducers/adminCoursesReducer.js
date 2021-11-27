const coursesInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const adminCoursesReducer = ( state = coursesInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_COURSES': {
            return {...state}
        }
        case 'GET_ADMINCOURSES': {
            return {...state, data: [...action.payload]}
        }
        case 'EDIT_COURSES': {
            console.log('unedited state',state)
            const result = state.data.map((course) => {
                if(course._id === action.payload._id){
                    return {...course, ...action.payload}
                }else{
                    return {...course}
                }
            })
            console.log('edited courses',result)
            return {...state, data: [...result]}
        }
        case 'REMOVE_COURSES': {
            const result = state.data.filter((course) => {
                return course._id !== action.payload._id
            })
            console.log('filtered removed res',result)
            return {...state, data: [...result]}
        }
        case 'ENROLL_ADMINCOURSES': {
            const result = state.data.map((course) => {
                if(course._id === action.payload._id){
                    return {...course, ...action.payload}
                }else{
                    return {...course}
                }
            })
            console.log(result)
            return {...state, data: [...result]}
        }
        case 'UNENROLL_ADMINCOURSES': {
            const result = state.data.map((course) => {
                if(course._id === action.payload._id){
                    return {...course, ...action.payload}
                }else{
                    return {...course}
                }
            })
            console.log(result)
            return {...state, data: [...result]}
        }
        default: {
            return {...state}
        }
    }
}