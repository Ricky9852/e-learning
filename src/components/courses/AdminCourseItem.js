import axios from "axios";
import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt" ;
import { useDispatch, useSelector } from "react-redux";
import { startEnrollAdminCourses, startUnEnrollAdminCourses } from "../../actions/adminCoursesAction";
import { startGetStudents } from "../../actions/adminStudentsAction";
import EditCourse from "./EditCourse";
import EnrollStudentsTable from "./EnrollStudentsTable";

const AdminCourseItem = props =>{
    const {cid: id} = props.match.params
    const dispatch = useDispatch()
    const [toggle,setToggle] = useState(true)
    const [course,setCourse] = useState({})
    const handleEdit=()=>{
        setToggle(!toggle)
    }
    const handleEnroll = ( _id ) =>{
        dispatch(startEnrollAdminCourses( id,_id ))
        // alert('hi')
    }
    const handleUnEnroll = ( _id ) =>{
        dispatch(startUnEnrollAdminCourses( id,_id ))
    }
    const students = useSelector((state)=>{
        return state.students.data
    })
    const enrolledStudents = id => {
        const result = students.find((student)=> {
            return id === student._id
        })
        return result != undefined ? result.name : ''
    }
    
    // const courses = useSelector((state)=>{
    //     return state.adminCourses.data
    // })
    useEffect(()=>{
        dispatch(startGetStudents())
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setCourse(result)
                console.log('courseitem',result)
            })
            .catch((err) => {
                alert(err.message)
            })
        
        // const result=students.find((ele)=>{
        //     return ele._id===id
        // })
        // localStorage.removeItem('student')
        // localStorage.setItem('student',JSON.stringify(result))
        // // setStudent(JSON.parse(localStorage.getItem('student')))
    },[course])
    // console.log(localStorage.getItem('student'));
    return (
        <div>
            <div style={{textAlign:'center'}}>
                <h2>Course Details</h2>
                <button onClick={handleEdit} className="btn btn-outline-primary">Edit</button>
                {toggle ? (
                    <div>
                        {Object.keys(course).length>0 && (
                            <div>
                                <div className=" card bg-light" style={{textAlign:'center', left:"475px",width:"400px"}}>
                                    <div className="card-body" >
                                        <p>Course Name:{course.name}</p>
                                        <p>Course Description:{course.description}</p>
                                        <p>Course Duration:{course.duration}</p>
                                        {/* <p>Course Release Date:{course.releaseDate}</p> */}
                                        <p>Course Category:{course.category}</p>
                                        <p>Course Validity:{course.validity}</p>
                                        <p>Course Level:{course.level}</p>
                                        <p>Course Author:{course.author}</p>
                                        <p>Course Deletion:{String(course.isDelete)}</p>
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
                                <div >
                                    
                                    {/* <h3 style={{color:'#2d96c0'}}>Enroll Students</h3> */}
                                    <EnrollStudentsTable id={id} handleEnroll={handleEnroll} handleUnEnroll={handleUnEnroll}/>
                                </div>
                            </div>
                        )}
                    </div>
                ):(
                    <div>
                        <EditCourse course={course} id={id} handleEdit={handleEdit} toggle={toggle}/>
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default AdminCourseItem