const lecturesInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

export const adminLecturesReducer = ( state = lecturesInitialState, action) => {
    switch(action.type){
        case 'SET_ERRORS': {
            return {...state, errors: {...action.payload}}
        }
        case 'ADD_LECTURES': {
            return {...state}
        }
        case 'GET_ADMINLECTURES': {
            return {...state, data: [...action.payload]}
        }
        case 'EDIT_LECTURES': {
            console.log('unedited state',state.data)
            const result = state.data.map((lecture) => {
                if(lecture._id === action.payload._id){
                    return {...lecture, ...action.payload}
                }else{
                    return {...lecture}
                }
            })
            console.log('result in edit lec',result)
            return {...state, data: [...result]}
        }
        case 'REMOVE_LECTURES': {
            const result = state.data.filter((lecture) => {
                return lecture._id !== action.payload._id
            })
            console.log('filtered removed res',result)
            return {...state, data: [...result]}
        }
        default: {
            return {...state}
        }
    }
}