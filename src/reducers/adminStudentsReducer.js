const studentsInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const adminStudentReducer = ( state = studentsInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_STUDENT': {
            return {...state}
        }
        case 'GET_STUDENTS': {
            return {...state, data: [...action.payload]}
        }
        case 'EDIT_STUDENT': {
            const result = state.data.map((student) => {
                if(student._id === action.payload._id){
                    return {...student, ...action.payload}
                }else{
                    return {...student}
                }
            })
            console.log(result)
            return {...state, data: [...result]}
        }
        case 'REMOVE_STUDENT': {
            const result = state.data.filter((student) => {
                return student._id !== action.payload._id
            })
            return {...state, data: [...result]}
        }
        default: {
            return {...state}
        }
    }
}