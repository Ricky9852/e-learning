import axios from 'axios';
import Swal from 'sweetalert2'

export const startSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddAdmin = (formData, redirect) => {
    // console.log(formData)
    return (dispatch) => {
        axios.post('https://dct-e-learning.herokuapp.com/api/admin/register', formData)
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
                        Swal.fire(
                            'Good job!',
                            'Successfully created an account',
                            'success'
                          )
                        // alert('successfully created an account')
                        console.log(response)
                        dispatch(addAdmin())//i dont think this is compulsory
                        redirect()
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

export const addAdmin = () => {
    return {
        type: 'ADD_ADMIN'
    }
}

export const startLogAdmin = (formData, redirect) => {
    return (dispatch) => {
        axios.post('https://dct-e-learning.herokuapp.com/api/admin/login', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    }else{
                        Swal.fire(
                            'Good job!',
                            'Successfully Logged in',
                            'success'
                          )
                        // alert('successfully logged in')
                        // console.log('login data',result)
                        localStorage.setItem('token', result.token)
                        dispatch(adminLogged())
                        redirect()
                    }
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

export const adminLogged = () => {
    return {
        type: 'LOGGED'
    }
}

export const startGetAdmin = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/admin/account', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getAdmin(result))
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

export const getAdmin = result => {
    return {
        type: 'GET_ADMIN',
        payload: result
    }
}

export const startEditAdmin = (formData, handleToggle) => {
    console.log('edit',formData)
    return (dispatch) => {
        axios.put('https://dct-e-learning.herokuapp.com/api/admin', formData, {
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
                        alert('successfully edited an account')
                        console.log('edited res',result)
                        dispatch(editAdmin(result))
                        handleToggle()
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

export const editAdmin = (result) => {
    return {
        type: 'EDIT_ADMIN',
        payload: result
    }
}