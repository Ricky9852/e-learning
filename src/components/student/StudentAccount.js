import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt" ;
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { startGetStudent } from "../../actions/studentAction";
import { startGetStudentCourses } from "../../actions/studentCoursesAction";

const StudentAccount = props =>{
    const myDecodedToken = decodeToken(localStorage.getItem('stoken'));
    console.log('decoded',myDecodedToken)
    const sid = myDecodedToken._id
    const dispatch = useDispatch()
    // const [student, setStudent] = useState({})
    // const handleSetStudent = (studentData) => {
    //     setStudent(studentData)
    // }
    const student = useSelector((state) => {
        return state.student.data
    })
    const courses = useSelector((state)=>{
        return state.studentCourses.data
    })
    const enrolledCourses = id => {
        const result = courses.find((course)=> {
            return id === course._id
        })
        console.log('enrolled courses',result);
        return result != undefined ? result.name : ''
    }
    useEffect(()=>{
        dispatch(startGetStudent(sid))
        dispatch(startGetStudentCourses())
        // if(Object.keys(student).length===0){
            // dispatch(startGetSingleAdminStudent(sid, handleSetStudent))
        // }
    },[])
    return (
        <div>
            <div style={{textAlign:'center'}}>
                <h2>Student Details</h2>
                {Object.keys(student).length !== 0 ? (
                    <div>
                        <div className="mx-auto card bg-light" style={{textAlign:'center', width:"400px"}}>
                            <div className="card-body" >
                                <p>Name:{student.name}</p>
                                <p>Email:{student.email}</p>
                                <p>Allowed:{String(student.isAllowed)}</p>
                                <p>Role:{student.role}</p>
                                <div>Enrolled Courses:
                                    <ol>
                                        {student.courses.map((ele,i)=>{
                                            return <li key={ele.course}>{enrolledCourses(ele.course)}</li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
            </div>
        </div>
    )
}

export default StudentAccount