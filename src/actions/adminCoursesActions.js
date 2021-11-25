import axios from 'axios'

export const startAddCourses = (formData) =>{
    console.log('formdata for reg stu',formData)
    return (dispatch)=>{
        axios.post('https://dct-e-learning.herokuapp.com/api/courses', formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully added a student')
                        console.log('student reg response',result)
                        dispatch(addCourses())
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}
export const addCourses = () =>{
    return {
        type: 'ADD_COURSES'
    }
}

export const startGetAdminCourses = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/courses', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getAdminCourses(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getAdminCourses = result => {
    return {
        type: 'GET_ADMINCOURSES',
        payload: result
    }
}