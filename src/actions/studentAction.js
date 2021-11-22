import axios from "axios"

export const startLogStudent = (formData, redirect) => {
    return (dispatch) => {
        axios.post('https://dct-e-learning.herokuapp.com/api/students/login', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.errors)
                    }else{
                        alert('successfully logged in')
                        // console.log('login data',result)
                        localStorage.setItem('stoken', result.token)
                        dispatch(logStudent())
                        redirect()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
    }
}

export const logStudent = () => {
    return {
        type: 'STUDENT_LOG'
    }
}