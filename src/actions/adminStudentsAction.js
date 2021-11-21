import axios from 'axios'

export const startAddStudent = (formData) =>{
    return (dispatch)=>{
        axios.post('https://dct-e-learning.herokuapp.com/api/admin/students', formData, {
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
                        console.log('edited res',result)
                        dispatch(addStudent())
                    }
                })
                .catch((err)=>{
                    alert(err.message)
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
                alert(err.message)
            })
    }
}

export const getStudents = result => {
    return {
        type: 'GET_STUDENTS',
        payload: result
    }
}

export const startEditAdmin = (formData, handleToggle) => {
    console.log('edit',formData)
    return (dispatch) => {
        axios.put('https://dct-e-learning.herokuapp.com/api/students/', formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then( (response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully edited an account')
                        console.log('edited res',result)
                        dispatch(editAdmin(result))
                        handleToggle()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const editAdmin = (result) => {
    return {
        type: 'EDIT_ADMIN',
        payload: result
    }
}

export const startEditStudent = (id, formData, toggle) => {
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
                        alert(result.message)
                    } else {
                        alert('successfully edited an account')
                        console.log('edited res',result)
                        dispatch(editStudent(result))
                        toggle()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const editStudent = (result) => {
    return {
        type: 'EDIT_STUDENT',
        payload: result
    }
}