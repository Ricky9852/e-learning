import React from "react";
import { useDispatch } from "react-redux";
import { startEditAdminCourses } from "../../actions/adminCoursesAction";
import { startEditAdminLectures, startGetAdminLectures } from "../../actions/adminLecturesAction";
import LecturesForm from "./LecturesForm";

const EditLecture = props =>{
    const { lecture, cid, lid, handleEdit } = props
    const dispatch = useDispatch()
    const handleSubmit = (formData) =>{
        delete formData.comments
        // dispatch(startGetAdminLectures())
        dispatch(startEditAdminLectures(formData, cid, lid))
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