import axios from "axios";
import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt" ;
import { useDispatch, useSelector } from "react-redux";
import { startEnrollAdminCourses, startGetSingleAdminCourse, startUnEnrollAdminCourses } from "../../actions/adminCoursesAction";
import { startGetStudents } from "../../actions/adminStudentsAction";
import EditCourse from "./EditCourse";
import EnrollStudentsTable from "./EnrollStudentsTable";

const AdminCourseItem = props =>{
    const {cid: id} = props.match.params
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [enrollToggle, setEnrollToggle] = useState(false)
    const [course, setCourse] = useState({})
    const handleEdit = () => {
        setToggle(!toggle)
    }
    const handleEnrollToggle = () => {
        setEnrollToggle(!enrollToggle)
    }
    const handleEnroll = ( _id ) =>{
        dispatch(startEnrollAdminCourses( id,_id,handleEnrollToggle))
        handleEnrollToggle()
        
        // dispatch(startGetSingleAdminCourse(id, handleSetCourse))
        // alert('hi')
    }
    const handleUnEnroll = ( _id ) =>{
        dispatch(startUnEnrollAdminCourses( id,_id,handleEnrollToggle))
        handleEnrollToggle()
        // dispatch(startGetSingleAdminCourse(id, handleSetCourse))
    }
    const students = useSelector((state)=>{
        return state.students.data
    })
    const adminCourses = useSelector((state)=>{
        return state.adminCourses.data
    })
    const enrolledStudents = sid => {
        const result = students.find((student)=> {
            return sid === student._id
        })
        return result != undefined ? result.name : ''
    }
    const handleSetCourse = (courseData) => {
        setCourse(courseData)
    }
    // const courses = useSelector((state)=>{
    //     return state.adminCourses.data
    // })
    useEffect(()=>{
        dispatch(startGetStudents())
    },[])
    useEffect(()=>{
        // if(Object.keys(course).length===0){
            dispatch(startGetSingleAdminCourse(id, handleSetCourse))
        // }
    },[adminCourses])
    // console.log(localStorage.getItem('student'));
    return (
        <div>
            <div>
                { enrollToggle ? (
                    <EnrollStudentsTable id={id} course={course} handleEnrollToggle={handleEnrollToggle} handleEnroll={handleEnroll} handleUnEnroll={handleUnEnroll}/>
                ) : (
                    <div style={{textAlign:'center'}}>
                    <h2>Course Details</h2>
                    <button onClick={handleEdit} className="btn btn-outline-primary">Edit</button><button className="btn btn-outline-primary" onClick={handleEnrollToggle}>Enroll/Unenroll</button>
                    {toggle ? (
                        <div>
                            {Object.keys(course).length !== 0 ? (
                                <div>
                                    <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                                        <div className="card-body" >
                                            <p>Course Name: {course.name}</p>
                                            <p>Course Description: {course.description}</p>
                                            <p>Course Duration: {course.duration} months</p>
                                            {/* <p>Course Release Date:{course.releaseDate}</p> */}
                                            <p>Course Category: {course.category}</p>
                                            <p>Course Validity: {course.validity} years</p>
                                            <p>Course Level: {course.level}</p>
                                            <p>Course Author: {course.author}</p>
                                            <p>Course Deletion: {String(course.isDelete)}</p>
                                            {/* <p>Course Created At:{course.createdAt}</p> */}
                                            {/* <p>Course Updated At:{course.updatedAt}</p> */}
                                            <div>Students Enrolled:
                                                <ul>
                                                    {course.students.map((ele,i)=>{
                                                        return <li key={i}>{enrolledStudents(ele.student)}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    ):(
                        <div>
                            <EditCourse course={course} id={id} handleEdit={handleEdit} toggle={toggle}/>
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
        
    )
}

export default AdminCourseItem