import axios from 'axios'
import Swal from 'sweetalert2'

export const startStudentSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddStudent = (formData) =>{
    console.log('formdata for reg stu',formData)
    return (dispatch)=>{
        axios.post('https://dct-e-learning.herokuapp.com/api/admin/students', formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
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
                        // alert('successfully added a student')
                        Swal.fire(
                            'Good job!',
                            'New Student Added Successfully',
                            'success'
                          )
                        console.log('student reg response',result)
                        dispatch(addStudent())
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
export const addStudent = () =>{
    return {
        type: 'ADD_STUDENT'
    }
}

export const startGetStudents = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/admin/students', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getStudents(result))
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

export const getStudents = result => {
    return {
        type: 'GET_STUDENTS',
        payload: result
    }
}

export const startEditStudent = (id, formData) => {
    console.log('edit',formData)
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/students/${id}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then( (response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    } else {
                        // alert('successfully edited an account')
                        Swal.fire(
                            'Good job!',
                            'Account Edited Successfully',
                            'success'
                          )
                        console.log('edited res',result)
                        dispatch(editStudent(result))
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

export const editStudent = (result) => {
    return {
        type: 'EDIT_STUDENT',
        payload: result
    }
}

export const startRemoveStudent = (_id) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/admin/students/${_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
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
                        // alert('successfully removed the account')
                        Swal.fire(
                            'Good job!',
                            'Removed Account Successfully',
                            'success'
                          )
                        console.log('removed res',result)
                        dispatch(removeStudent(result))
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

export const removeStudent = (result) => {
    return {
        type: 'REMOVE_STUDENT',
        payload: result
    }
}

export const startGetSingleAdminStudent = (id, handleSetStudent) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const studentData = response.data
                handleSetStudent(studentData)
                console.log('studentitem',studentData)
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