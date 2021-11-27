import axios from "axios"

export const startGetStudentCourses = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/courses', {
            headers: {
                'Authorization': localStorage.getItem('stoken')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getStudentCourses(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getStudentCourses = result => {
    return {
        type: 'GET_STUDENTCOURSES',
        payload: result
    }
}

export const startEnrollStudentCourses = (_id) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${_id}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('stoken')
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
                        dispatch(enrollStudentCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const enrollStudentCourses = (result) => {
    return {
        type: 'ENROLL_STUDENTCOURSES',
        payload: result
    }
}

export const startUnEnrollStudentCourses = (id,_id) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${_id}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('stoken')
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
                        dispatch(unEnrollStudentCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const unEnrollStudentCourses = (result) => {
    return {
        type: 'UNENROLL_StudentCOURSES',
        payload: result
    }
}