import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetStudents } from "../../actions/adminStudentsAction";

const EnrollStudentsTable = props =>{
    const { handleEnroll, handleUnEnroll } = props
    const dispatch=useDispatch()
    const students = useSelector((state)=>{
        return state.students.data
    })
    useEffect(()=>{
        dispatch(startGetStudents())
    },[])

    return (
        <div>
            {
                students.length>0 && (
                    <div>
                        <table className='table'>
                            <thead>
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
                                                <td><button onClick={()=>{handleEnroll(student._id)}}>Enroll</button><button onClick={()=>{handleUnEnroll(student._id)}}>Un-Enroll</button></td>
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