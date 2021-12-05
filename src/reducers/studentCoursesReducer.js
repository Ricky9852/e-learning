const coursesInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const studentCoursesReducer = ( state = coursesInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'GET_STUDENTCOURSES': {
            return {...state, data: [...action.payload]}
        }
        case 'ENROLL_STUDENTCOURSES': {
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
        case 'UNENROLL_STUDENTCOURSES': {
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