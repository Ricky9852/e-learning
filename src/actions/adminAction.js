import axios from 'axios';

export const startSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddAdmin = (formData, redirect) => {
    console.log(formData)
    return (dispatch) => {
        axios.post('https://dct-e-learning.herokuapp.com/api/admin/register', formData)
                .then( (response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully created an account')
                        console.log(response)
                        dispatch(addAdmin())//i dont think this is compulsory
                        redirect()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
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
                        alert(result.errors)
                    }else{
                        alert('successfully logged in')
                        localStorage.setItem('token', result.token)
                        dispatch(adminLogged())
                        redirect()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
    }
}

export const adminLogged = () => {
    return {
        type: 'LOGGED'
    }
}

export const startGetAdmin = (props) => {
    return (dispatch) => {
        if(!localStorage.getItem('token')) {
            props.history.push('/')
        }
        axios.get('https://dct-e-learning.herokuapp.com/api/admin/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(getAdmin(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getAdmin = result => {
    return {
        type: 'GET_ADMIN',
        payload: result
    }
}