import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditCourse from "./EditCourse";

const AdminCourseItem = props =>{
    const {id} = props.match.params
    const [toggle,setToggle] = useState(true)
    const [course,setCourse] = useState({})
    const handleEdit=()=>{
        setToggle(!toggle)
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
    },[])
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
                                <p>Course Created At:{course.createdAt}</p>
                                <p>Course Updated At:{course.updatedAt}</p>
                                {/* <p>Students Enrolled:
                                        {student.courses.map((course,i)=>{
                                            return <li key={i}>{course}</li>
                                        })}
                                </p> */}
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