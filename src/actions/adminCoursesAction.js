import axios from 'axios'

export const startCoursesSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddCourses = (formData) =>{
    console.log('formdata foradd cour',formData)
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
                        alert('successfully added a course')
                        console.log('course response',result)
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

export const startEditAdminCourses = (formData, _id) => {
    console.log("formdata in action",formData)
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/courses/${_id}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(startGetAdminCourses())
                dispatch(editAdminCourses(result))
                alert('course updated successfully')
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const editAdminCourses = result => {
    return {
        type: 'EDIT_COURSES',
        payload: result
    }
}

export const startRemoveCourses = (_id) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully removed the course')
                        console.log('removed res',result)
                        dispatch(removeCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const removeCourses = (result) => {
    return {
        type: 'REMOVE_COURSES',
        payload: result
    }
}

export const startEnrollAdminCourses = (id,_id) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${id}&studentId=${_id}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully enrolled the course')
                        console.log('enrolled res',result)
                        dispatch(enrollAdminCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const enrollAdminCourses = (result) => {
    return {
        type: 'ENROLL_ADMINCOURSES',
        payload: result
    }
}

export const startUnEnrollAdminCourses = (id,_id) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${id}&studentId=${_id}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
        )
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully unenrolled the course')
                        console.log('enrolled res',result)
                        dispatch(unEnrollAdminCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const unEnrollAdminCourses = (result) => {
    return {
        type: 'UNENROLL_ADMINCOURSES',
        payload: result
    }
}