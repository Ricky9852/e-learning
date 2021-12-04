import axios from "axios"
import Swal from 'sweetalert2'

export const startLogStudent = (formData, redirect) => {
    return (dispatch) => {
        axios.post('https://dct-e-learning.herokuapp.com/api/students/login', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        // alert(result.errors)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    }else{
                        // alert('successfully logged in')
                        Swal.fire(
                            'Good job!',
                            'Logged in Successfully',
                            'success'
                          )
                        // console.log('login data',result)
                        localStorage.setItem('stoken', result.token)
                        dispatch(logStudent())
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

export const logStudent = () => {
    return {
        type: 'STUDENT_LOG'
    }
}