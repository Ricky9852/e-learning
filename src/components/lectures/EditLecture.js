import React from "react";
import { useDispatch } from "react-redux";
import { startEditAdminCourses } from "../../actions/adminCoursesAction";
import LecturesForm from "./LecturesForm";

const EditLecture = props =>{
    const { lecture, cid, lid, handleEdit } = props
    const dispatch = useDispatch()
    const handleSubmit = (formData) =>{
        // dispatch(startEditAdminCourses(formData, lid, cid))
        handleEdit()
    }
    const handleCancel = () => {
        handleEdit()
    }
    return (
        <div>
            <button onClick={handleCancel} className="btn btn-outline-danger">Cancel</button>
            <LecturesForm handleSubmit={handleSubmit} {...lecture} lid={lid} cid={cid}/>
        </div>
        
    )
}

export default EditLecture