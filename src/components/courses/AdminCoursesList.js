import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGetAdminCourses, startRemoveCourses } from "../../actions/adminCoursesAction";

const AdminCoursesList = props => {
    const dispatch=useDispatch()
    const adminCourses = useSelector((state)=>{
        return state.adminCourses.data
    })
    useEffect(()=>{
        dispatch(startGetAdminCourses())
        console.log('admincourses',adminCourses)
    },[adminCourses])
    const handleRemove=(_id)=>{
        dispatch(startRemoveCourses(_id))
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
                adminCourses.length !== 0 ? (
                    <div>
                        {/* <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Course Name</th>
                                    <th>Category</th>
                                    <th>Duration(in months)</th>
                                    <th>Validity(in years)</th>
                                    <th>Course Release Date</th> 
                                    <th>Level</th>
                                    <th>Details</th>
                                    <th>Lectures</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminCourses.map((course,i)=>{
                                        return <tr key={course._id}>
                                            <td>{i+1}</td>
                                            <td>{course.name}</td>
                                            <td>{course.category}</td>
                                            <td>{course.duration}</td>
                                            <td>{course.validity}</td>
                                            <td>{course.releaseDate}</td>
                                            <td>{course.level}</td>
                                            <td><Link to={`/courses/admin-course-list/cid=${course._id}`}><button className="btn btn-info">Details</button></Link></td>
                                            <td><Link to={`/courses/admin-course-list/cid=${course._id}/lectures`}><button className="btn btn-info">Lectures</button></Link></td>
                                            <td><button className="btn btn-danger" onClick={()=>{handleRemove(course._id)}}>Remove</button></td>
                                        </tr>
                                    })}
                            </tbody>
                        </table> */}
                        <div style={{textAlign:'center'}}><Link to = '/courses/addcourse'><button className = 'btn btn-outline-primary'>Add New Course</button></Link></div>
                        <div className="row">
                            {
                                adminCourses.map((course) => {
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
                                                        <Link to={`/courses/admin-course-list/cid=${course._id}`}><button className="btn btn-outline-secondary">📑</button></Link> </span>
                                                    <span className="col-md-4">
                                                        <Link to={`/courses/admin-course-list/cid=${course._id}/lectures`}><button className="btn btn-outline-secondary">📚</button></Link>
                                                    </span>
                                                    <span className="col-md-4">
                                                        <button className="btn btn-outline-secondary" onClick={()=>{handleRemove(course._id)}}>❌</button>
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

export default AdminCoursesList