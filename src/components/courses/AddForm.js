import React from "react";
import { useDispatch } from "react-redux";
import { startAddCourses } from "../../actions/adminCoursesAction";
import CoursesForm from "./CoursesForm";

const AddForm = props =>{
    const dispatch = useDispatch()
    const handleSubmit = formData =>{
        dispatch(startAddCourses(formData))
    }
    return (
        <div style={{textAlign:'center'}}>
            <h1>Add New Course</h1>
            <CoursesForm handleSubmit={handleSubmit}/>
        </div>
    )
}

export default AddForm