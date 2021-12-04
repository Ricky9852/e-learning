import React from "react";
import { useDispatch } from "react-redux";
import { startAddLecture } from "../../actions/adminLecturesAction";
import LecturesForm from "./LecturesForm";

const AddLecture = props => {
    const {cid} = props.match.params
    // const cid = localStorage.getItem('cid')
    const dispatch = useDispatch()
    const handleSubmit = (formData, redirect) =>{
        dispatch(startAddLecture(formData, cid, redirect))
    }
    const handleBack = () => {
        props.history.push(`/courses/admin-course-list/cid=${cid}/lectures`)
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Add New Lecture</h1>
            <LecturesForm handleSubmit={handleSubmit} cid={cid} {...props}/>
            <button className='btn btn-outline-secondary' onClick={handleBack}>Back</button>
        </div>
    )
}

export default AddLecture