import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEnrollStudentCourses, startGetStudentCourses, startUnEnrollStudentCourses } from "../../actions/studentCoursesAction";
import { decodeToken } from "react-jwt" ;
import { Link } from "react-router-dom";

const StudentCoursesList = props => {
    const dispatch=useDispatch()
    const studentCourses = useSelector((state)=>{
        return state.studentCourses.data
    })
    console.log('sc',studentCourses)
    const stoken = localStorage.getItem('stoken')
    const decodedSToken = decodeToken(stoken)
    const sid = decodedSToken._id
    // console.log('stoken',decodedSToken)
    useEffect(()=>{
        dispatch(startGetStudentCourses())
    },[studentCourses])
    const handleEnroll = ( cid ) =>{
        dispatch(startEnrollStudentCourses( cid ))
        // alert('hi')
    }
    const handleUnEnroll = ( cid ) =>{
        dispatch(startUnEnrollStudentCourses( cid ))
    }
    const enrolled = (course) => {
        if(Object.keys(course).length !== 0 ){
            const result = course.students.find((ele)=>{
                return sid===ele.student
            })
            console.log('res',result)
            return Boolean(result) ? true : false
        }
    }
    const courseIcon = category => {
        if(category==='HTML'){
            return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-html-5-512.png'
        }else if(category==='CSS'){
            return 'https://cdn1.iconfinder.com/data/icons/logotypes/32/badge-css-3-512.png'
        }else if(category==='javascript'){
            return 'https://cdn2.iconfinder.com/data/icons/designer-skills/128/code-programming-javascript-software-develop-command-language-512.png'
        }else if(category==='reactjs'){
            return 'https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react_color-512.png'
        }else if(category==='nodejs'){
            return 'https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-512.png'
        }else if(category==='expressjs'){
            return 'https://symbols.getvecta.com/stencil_79/88_expressjs-icon.54bb6035d3.svg'
        }else if(category==='mongodb'){
            return 'https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-512.png'
        }
    }
    return (
        <div>
            {
                studentCourses.length !== 0 ? (
                    <div>
                        <div className="row">
                            {
                                studentCourses.map((course) => {
                                    return (
                                        <div key={course._id} className="col-sm-3">
                                            <div className="card" style={{width:'18rem'}}>
                                            <div className="card-body" style={{textAlign:'center'}}>
                                                <h5 className="card-title">{course.name}</h5>
                                                <Link to={`/courses/admin-course-list/cid=${course._id}`}>
                                                    <img src={courseIcon(course.category)} alt={course.category} style={{height:'100px', width:'100px'}} />
                                                </Link>
                                                <div className="row">
                                                    <span className="col-md-4" >
                                                        <Link to={`/courses/student-course-list/cid=${course._id}`}><button className="btn btn-outline-secondary">Details</button></Link> </span>
                                                    <span className="col-md-4">
                                                        <Link to={`/courses/student-course-list/cid=${course._id}/lectures`}><button className="btn btn-outline-secondary">Lectures</button></Link>
                                                    </span>
                                                    <span className="col-md-4">
                                                    { !enrolled(course) ? 
                                                        (
                                                            <button className="btn btn-outline-success" onClick={()=>{handleEnroll(course._id)}}>Enroll</button>
                                                        ) : (
                                                            <button className="btn btn-outline-danger" onClick={()=>{handleUnEnroll(course._id)}}>UnEnroll</button>
                                                        )
                                                    }
                                                    </span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}


{/* <td><button className="btn btn-success" onClick={()=>{handleEnroll(course._id)}}>Enroll</button><button className="btn btn-danger" onClick={()=>{handleUnEnroll(course._id)}}>Un-Enroll</button></td> */}

export default StudentCoursesList