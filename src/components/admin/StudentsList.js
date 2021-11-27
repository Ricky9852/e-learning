import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetStudents, startRemoveStudent } from "../../actions/adminStudentsAction";
import { Link, Route, withRouter } from "react-router-dom";

const StudentsList = props =>{
    const dispatch=useDispatch()
    const students = useSelector((state)=>{
        return state.students.data
    })
    useEffect(()=>{
        dispatch(startGetStudents())
        console.log('studs',students)
    },[])

    const handleRemove=(_id)=>{
        dispatch(startRemoveStudent(_id))
    }
    return (
        <div>
            <h2>Students List</h2>
            {
                students.length>0 && (
                    <div>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    {/* <th>Password</th> */}
                                    <th>Role</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student,i)=>{
                                    return <tr key={student._id}>
                                                <td>{i+1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                {/* <td>{student.password}</td> */}
                                                <td>{student.role}</td>
                                                <td><Link to={`/students/list/${student._id}`}><button className="btn btn-info">Details</button></Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{handleRemove(student._id)}}>Delete</button></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            }
            {/* <Route path='/students/list/:id' component={StudentItem} exact/> */}
        </div>
    )
}

const WrapperComponent = withRouter(StudentsList)
export default WrapperComponent;