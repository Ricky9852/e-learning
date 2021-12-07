import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEnrollAdminCourses, startGetSingleAdminCourse, startUnEnrollAdminCourses } from "../../actions/adminCoursesAction";
import { startGetStudents } from "../../actions/adminStudentsAction";
import { startGetSingleStudentCourse, startGetStudentCourses } from "../../actions/studentCoursesAction";
import EditCourse from "./EditCourse";
import EnrollStudentsTable from "./EnrollStudentsTable";

const StudentCourseItem = props =>{
    const {cid} = props.match.params
    const dispatch = useDispatch()
    const [course, setCourse] = useState({})
    const handleSetCourse = (courseData) => {
        setCourse(courseData)
    }
    console.log('st course',course)
    useEffect(()=>{
        if(Object.keys(course).length===0){
            dispatch(startGetSingleStudentCourse(cid, handleSetCourse))
        }
    },[])
    // console.log(localStorage.getItem('student'));
    return (
        <div style={{textAlign:'center'}}>
            <h2>Course Details</h2>
                <div>
                    {Object.keys(course).length !== 0 ? (
                        <div>
                            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                                <div className="card-body" >
                                    <p>Course Name:{course.name}</p>
                                    <p>Course Description:{course.description}</p>
                                    <p>Course Duration:{course.duration} months</p>
                                    {/* <p>Course Release Date:{course.releaseDate}</p> */}
                                    <p>Course Category:{course.category}</p>
                                    <p>Course Validity:{course.validity} years</p>
                                    <p>Course Level:{course.level}</p>
                                    <p>Course Author:{course.author}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
        </div>
        
    )
}

export default StudentCourseItem