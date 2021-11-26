import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEnrollAdminCourses } from "../../actions/adminCoursesActions";
import EditCourse from "./EditCourse";
import EnrollStudentsTable from "./EnrollStudentsTable";

const AdminCourseItem = props =>{
    const {id} = props.match.params
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
        
    }
    // const courses = useSelector((state)=>{
    //     return state.adminCourses.data
    // })
    useEffect(()=>{
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
                <button onClick={handleEdit}>Edit</button>
                {toggle ? (
                    <div>
                        {Object.keys(course).length>0 && (
                            <div>
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
                                            return <li key={i}>{ele.student}</li>
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <h3>Enroll Students</h3>
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