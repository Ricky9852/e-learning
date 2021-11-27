import React from "react";
import { useDispatch } from "react-redux";
import { startEditAdminCourses } from "../../actions/adminCoursesAction";
import CoursesForm from "./CoursesForm";

const EditCourse = props =>{
    const { course,id,handleEdit } = props
    const dispatch = useDispatch()
    const handleSubmit = (formData,_id) =>{
        dispatch(startEditAdminCourses(formData,_id))
        handleEdit()
    }
    const handleCancel = () => {
        handleEdit()
    }
    return (
        <div>
            <button onClick={handleCancel} className="btn btn-outline-danger">Cancel</button>
            <CoursesForm handleSubmit={handleSubmit} {...course} id={id}/>
        </div>
        
    )
}

export default EditCourse