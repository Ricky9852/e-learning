import React from "react";
import { useDispatch } from "react-redux";
import { startAddCourses } from "../../actions/adminCoursesActions";
import CoursesForm from "./CoursesForm";

const AddForm = props =>{
    const dispatch = useDispatch()
    const handleSubmit = formData =>{
        dispatch(startAddCourses(formData))
    }
    return (
        <CoursesForm handleSubmit={handleSubmit}/>
    )
}

export default AddForm