import axios from 'axios'
import Swal from 'sweetalert2'

export const startLecturesSetErrors = (errors) => {
    return {
        type: 'SET_ERRORS',
        payload: errors
    }
}

export const startGetStudentLectures = (cid) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures`, {
            headers: {
                'Authorization': localStorage.getItem('stoken')
            }
        })
            .then((response) => {
                const result = response.data
                console.log(result)
                dispatch(getStudentLectures(result))
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

export const getStudentLectures = result => {
    return {
        type: 'GET_STUDENTLECTURES',
        payload: result
    }
}

export const startGetSingleStudentLecture = (cid, lid, handleSetLecture) => {
    return (dispatch)=>{
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${lid}`, {
            headers: {
                'Authorization': localStorage.getItem('stoken')
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