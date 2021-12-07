import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditStudent from "./EditStudent";
import { startGetAdminCourses } from "../../actions/adminCoursesAction";
import { startGetSingleAdminStudent } from "../../actions/adminStudentsAction";

const StudentItem = props =>{
    const {id} = props.match.params
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [student, setStudent] = useState({})
    // const [enrolledCourses, setEnrolledCourses] = useState([])
    const handleEdit=()=>{
        setToggle(!toggle)
    }
    console.log('studentitem',student);
    const courses = useSelector((state)=>{
        return state.adminCourses.data
    })
    const enrolledCourses = id => {
        const result = courses.find((course)=> {
            return id === course._id
        })
        console.log('enrolled courses',result);
        return result != undefined ? result.name : ''
    }
    const handleSetStudent = (studentData) => {
        setStudent(studentData)
    }
    useEffect(()=>{
        dispatch(startGetAdminCourses())
        if(Object.keys(student).length===0){
            dispatch(startGetSingleAdminStudent(id, handleSetStudent))
        }
        // axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`, {
        //     headers: {
        //         'Authorization': localStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         const result = response.data
        //         console.log('studentitem',result)
        //         setStudent(result)
        //     })
        //     .catch((err) => {
        //         alert(err.message)
        //     })
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
                <h2>Student Details</h2>
                <button onClick={handleEdit} className="btn btn-outline-primary">Edit</button>
                {toggle ? (
                    <div>
                        {Object.keys(student).length !== 0 ? (
                            <div>
                                <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                                    <div className="card-body" >
                                        <p>Name:{student.name}</p>
                                        <p>Email:{student.email}</p>
                                        {/* <p>Password:{student.password}</p> */}
                                        <p>Allowed:{String(student.isAllowed)}</p>
                                        <p>Role:{student.role}</p>
                                        <div>Enrolled Courses:
                                            <ol>
                                                {student.courses.map((ele,i)=>{
                                                    return <li key={ele.course}>{enrolledCourses(ele.course)}</li>
                                                })}
                                            </ol>
                                        </div>
                                        {/* <p>User:{student.user}</p> */}
                                        {/* <p>Created At:{student.createdAt}</p> */}
                                        {/* <p>Updated At:{student.updatedAt}</p> */}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                    </div>
                ):(
                    <div>
                        <EditStudent student={student} id={id} handleEdit={handleEdit} toggle={toggle}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentItem