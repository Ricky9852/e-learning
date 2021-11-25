import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGetAdminCourses } from "../../actions/adminCoursesActions";

const AdminCoursesList = props => {
    const adminCourses = useSelector((state)=>{
        return state.adminCourses.data
    })
    console.log('admincourses',adminCourses)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startGetAdminCourses())
    },[])
    return (
        <div>
            {
                adminCourses.length>0 && (
                    <div>
                        <table className='table'>
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
                                        <td><Link to={`/courses/admin-course-list/${course._id}`}>Details</Link></td>
                                        <td>Delete</td>
                                    </tr>
                                })}
                        </tbody>
                            
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default AdminCoursesList