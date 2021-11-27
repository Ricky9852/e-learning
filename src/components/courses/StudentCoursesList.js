import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEnrollStudentCourses, startGetStudentCourses, startUnEnrollStudentCourses } from "../../actions/studentCoursesAction";
import { decodeToken } from "react-jwt" ;

const StudentCoursesList = props => {
    const dispatch=useDispatch()
    const studentCourses = useSelector((state)=>{
        return state.studentCourses.data
    })
    const stoken = localStorage.getItem('stoken')
    const decodedSToken = decodeToken(stoken)
    console.log('stoken',decodedSToken)
    useEffect(()=>{
        dispatch(startGetStudentCourses())
    },[])
    const handleEnroll = ( _id ) =>{
        dispatch(startEnrollStudentCourses( _id ))
        // alert('hi')
    }
    const handleUnEnroll = ( _id ) =>{
        dispatch(startUnEnrollStudentCourses( _id ))
    }
    return (
        <div>
            {
                // adminCourses.length>0 && (
                    <div>
                        <table className='table table-striped'>
                        <thead style={{color:'#2d96c0'}} >
                            <tr>
                                <th>No.</th>
                                <th>Course Name</th>
                                <th>Category</th>
                                <th>Duration(in months)</th>
                                <th>Validity(in years)</th>
                                {/* <th>Course Release Date</th> */}
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentCourses.map((course,i)=>{
                                    return <tr key={course._id}>
                                        <td>{i+1}</td>
                                        <td>{course.name}</td>
                                        <td>{course.category}</td>
                                        <td>{course.duration}</td>
                                        <td>{course.validity}</td>
                                        {/* <td>{course.releaseDate}</td> */}
                                        <td>{course.level}</td>
                                        <td><button className="btn btn-success" onClick={()=>{handleEnroll(course._id)}}>Enroll</button><button className="btn btn-danger" onClick={()=>{handleUnEnroll(course._id)}}>Un-Enroll</button></td>
                                    </tr>
                                })}
                        </tbody>
                        </table>
                    </div>
                // )
            }
        </div>
    )
}

export default StudentCoursesList