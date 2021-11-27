import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetStudents } from "../../actions/adminStudentsAction";

const EnrollStudentsTable = props =>{
    const { handleEnroll, handleUnEnroll } = props
    const dispatch=useDispatch()
    const students = useSelector((state)=>{
        return state.students.data
    })
    const enrolledStudents = id => {
        const result = students.find((student)=> {
            return id === student._id
        })
        return result.name
    }
    useEffect(()=>{
        dispatch(startGetStudents())
    },[])

    return (
        <div>
            {
                students.length>0 && (
                    <div>
                        <table className='table table-striped'>
                            <thead className="thead-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student,i)=>{
                                    return <tr key={student._id}>
                                                <td>{i+1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td><button className="btn btn-outline-success" onClick={()=>{handleEnroll(student._id)}}>Enroll</button><button className="btn btn-outline-danger" onClick={()=>{handleUnEnroll(student._id)}}>Un-Enroll</button></td>
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

export default EnrollStudentsTable