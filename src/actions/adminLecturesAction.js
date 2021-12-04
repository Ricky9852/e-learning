import axios from 'axios'
import Swal from 'sweetalert2'

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
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    } else {
                        // alert('successfully added a lecture')
                        Swal.fire(
                            'Good job!',
                            'New Lecture Added Successfully',
                            'success'
                          )
                        console.log('lec add response',result)
                        dispatch(addLecture())
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
                // alert(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.message}`
                  })
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
                        // alert(result.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${result.message}`
                          })
                    } else {
                        // alert('successfully removed the lecture')
                        Swal.fire(
                            'Good job!',
                            'Lecture Removed Successfully',
                            'success'
                          )
                        console.log('removed res',result)
                        dispatch(removeLectures(result))
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

export const removeLectures = (result) => {
    return {
        type: 'REMOVE_LECTURES',
        payload: result
    }
}

export const startEditAdminLectures = (formData, cid, lid) => {
    console.log("formdata in edit lec action",formData)
    // console.log('cid',cid)
    // console.log('lid',lid)
    return (dispatch) => {
        axios.put(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${lid}`, formData, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('edited lecture result',result)
                // dispatch(startGetAdminLectures(cid))
                dispatch(editAdminLectures(result))
                Swal.fire(
                    'Good job!',
                    'Lecture Updated Successfully',
                    'success'
                  )
                // alert('lecture updated successfully')
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.message}`
                  })
            })
    }
}

export const editAdminLectures = result => {
    return {
        type: 'EDIT_LECTURES',
        payload: result
    }
}

export const startGetSingleAdminLecture = (cid, lid, handleSetLecture) => {
    return (dispatch)=>{
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${lid}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const lectureData = response.data
                handleSetLecture(lectureData)
                console.log('lectureitem',lectureData)
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