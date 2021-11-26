import React from "react";
import { useDispatch } from "react-redux";
import { startEditAdminCourses } from "../../actions/adminCoursesActions";
import CoursesForm from "./CoursesForm";

const EditCourse = props =>{
    const { course,id,handleEdit } = props
    const dispatch = useDispatch()
    const handleSubmit = (formData,_id) =>{
        dispatch(startEditAdminCourses(formData,_id))
        handleEdit()
    }
    return (
        <CoursesForm handleSubmit={handleSubmit} {...course} id={id}/>
    )
}

export default EditCourse