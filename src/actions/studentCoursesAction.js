import axios from "axios"
import Swal from 'sweetalert2'

export const startCoursesSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

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
                // alert(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.message}`
                  })
            })
    }
}

export const getStudentCourses = result => {
    return {
        type: 'GET_STUDENTCOURSES',
        payload: result
    }
}

export const startEnrollStudentCourses = (cid) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${cid}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('stoken')
                }
            }
        )
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    } else {
                        // alert('successfully enrolled the course')
                        Swal.fire(
                            'Good job!',
                            'Enrolled to the Course Successfully',
                            'success'
                          )
                        console.log('enrolled res',result)
                        dispatch(enrollStudentCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    // alert(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${err.message}`
                      })
                })
    }
}

export const enrollStudentCourses = (result) => {
    return {
        type: 'ENROLL_STUDENTCOURSES',
        payload: result
    }
}

export const startUnEnrollStudentCourses = (cid) => {
    return (dispatch) => {
        axios.patch(`https://dct-e-learning.herokuapp.com/api/courses/unenroll?courseId=${cid}`, {} , {
                headers: {
                    'Authorization': localStorage.getItem('stoken')
                }
            }
        )
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    } else {
                        // alert('successfully unenrolled the course')
                        Swal.fire(
                            'Good job!',
                            'Unenrolled to the Course Successfully',
                            'success'
                          )
                        console.log('enrolled res',result)
                        dispatch(unEnrollStudentCourses(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    // alert(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${err.message}`
                      })
                })
    }
}

export const unEnrollStudentCourses = (result) => {
    return {
        type: 'UNENROLL_StudentCOURSES',
        payload: result
    }
}

export const startGetSingleStudentCourse = (cid, handleSetCourse) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}`, {
            headers: {
                'Authorization': localStorage.getItem('stoken')
            }
        })
            .then((response) => {
                const courseData = response.data
                handleSetCourse(courseData)
                console.log('courseitem',courseData)
            })
            .catch((err) => {
                // alert(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.message}`
                  })
            })
    }
}