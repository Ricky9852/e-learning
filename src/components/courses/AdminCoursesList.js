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
    },[])
    const handleRemove=(_id)=>{
        dispatch(startRemoveCourses(_id))
    }
    return (
        <div>
            {
                // adminCourses.length>0 && (
                    <div>
                        <table className='table table-striped'>
                        <thead >
                            <tr>
                                <th>No.</th>
                                <th>Course Name</th>
                                <th>Category</th>
                                <th>Duration(in months)</th>
                                <th>Validity(in years)</th>
                                {/* <th>Course Release Date</th> */}
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
                                        {/* <td>{course.releaseDate}</td> */}
                                        <td>{course.level}</td>
                                        <td><Link to={`/courses/admin-course-list/cid=${course._id}`}><button className="btn btn-info">Details</button></Link></td>
                                        <td><Link to={`/courses/admin-course-list/cid=${course._id}/lectures`}><button className="btn btn-info">Lectures</button></Link></td>
                                        <td><button className="btn btn-danger" onClick={()=>{handleRemove(course._id)}}>Remove</button></td>
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

export default AdminCoursesList