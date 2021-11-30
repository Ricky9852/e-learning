import axios from 'axios'

export const startLecturesSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startAddLecture = (formData, cid, redirect) =>{
    console.log('formdata for add lec',formData)
    return (dispatch)=>{
        axios.post(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully added a lecture')
                        console.log('lec add response',result)
                        dispatch(addLecture())
                        redirect()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}
export const addLecture = () =>{
    return {
        type: 'ADD_LECTURES'
    }
}

export const startGetAdminLectures = (cid) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getAdminLectures(result))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const getAdminLectures = result => {
    return {
        type: 'GET_ADMINLECTURES',
        payload: result
    }
}

export const startRemoveLectures = (cid, _id) => {
    return (dispatch) => {
        axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('successfully removed the lecture')
                        console.log('removed res',result)
                        dispatch(removeLectures(result))
                        // handleEdit()
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })
    }
}

export const removeLectures = (result) => {
    return {
        type: 'REMOVE_LECTURES',
        payload: result
    }
}

export const startEditAdminLectures = (formData, cid, _id) => {
    console.log("formdata in action",formData)
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${_id}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(startGetAdminLectures())
                dispatch(editAdminLectures(result))
                alert('lecture updated successfully')
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const editAdminLectures = result => {
    return {
        type: 'EDIT_LECTURES',
        payload: result
    }
}