import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetStudents, startRemoveStudent } from "../../actions/adminStudentsAction";
import { Link, Route, withRouter } from "react-router-dom";

const StudentsList = props =>{
    const [searchText, setSearchText] = useState('')
    const [searchedStudents, setSearchedStudents] = useState([])
    const dispatch=useDispatch()
    const students = useSelector((state)=>{
        return state.students.data
    })
    useEffect(()=>{
        dispatch(startGetStudents()) 
    },[])
    useEffect(()=>{
        setSearchedStudents(students)
    },[students])
    const handleSearchChange = e => {
        const sText=e.target.value
        setSearchText(sText)
        const result = students.filter((student) => {
            return student.name.toLowerCase().includes(sText.toLowerCase())
        })
        console.log('fil',result)
        setSearchedStudents(result)
    }
    const handleRemove=(_id)=>{
        dispatch(startRemoveStudent(_id))
    }
    return (
        <div>
            <div className="row">
                <span className="col-md-3">
                    <h2>Students List</h2>
                </span>
                <span className="col-md-4"></span>
                {/* <span className="col-md-2"><Link to='/students/register'><button className='btn btn-outline-primary'>Register New Student</button></Link> </span> */}
                <span className="col-md-5">
                <Link to='/students/register'><button className='btn btn-outline-primary'>Register New Student</button></Link> 
                    <input type="text" placeholder="search students by name" value={searchText} onChange={handleSearchChange}/>
                </span>
            </div>
            {
                students.length !==0 ? (
                    <div>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Allowed</th>
                                    <th>Role</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchedStudents.map((student,i)=>{
                                    return <tr key={student._id}>
                                                <td>{i+1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.isAllowed ? <span>Yes</span> : <span>No</span> }</td>
                                                <td>{student.role}</td>
                                                <td><Link to={`/students/list/sid=${student._id}`}><button className="btn btn-info">Details</button></Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{handleRemove(student._id)}}>Delete</button></td>
                                            </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
            {/* <Route path='/students/list/:id' component={StudentItem} exact/> */}
        </div>
    )
}

const WrapperComponent = withRouter(StudentsList)
export default WrapperComponent;