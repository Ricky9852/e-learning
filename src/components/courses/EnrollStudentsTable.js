import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetSingleAdminCourse } from "../../actions/adminCoursesAction";
import { startGetStudents } from "../../actions/adminStudentsAction";

const EnrollStudentsTable = props =>{
    const { handleEnroll, handleUnEnroll, handleEnrollToggle, id } = props
    const [searchText, setSearchText] = useState('')
    const [searchedStudents, setSearchedStudents] = useState([])
    const [course, setCourse] = useState({})
    const dispatch=useDispatch()
    const students = useSelector((state)=>{
        return state.students.data
    })
    const handleSetCourse = (courseData) => {
        setCourse(courseData)
    }
    
    console.log('course',course)
    useEffect(()=>{
        dispatch(startGetStudents())
        dispatch(startGetSingleAdminCourse(id, handleSetCourse))
    },[])
    useEffect(()=>{
        // setSearchedStudents(students)
    },[course])
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
    const handleCancel = () =>{
        handleEnrollToggle()
    }
    const enrolled = (sid) => {
        if(Object.keys(course).length !== 0 ){
            const result = course.students.find((ele)=>{
                return sid===ele.student
            })
            console.log('res',result)
            return Boolean(result) ? true : false
        }
    }
    return (
        <div>
            <div className="row">
                <span className="col-md-6">
                    <h2>Students List</h2>
                </span>
                <span className="col-md-3"><button className="btn btn-outline-danger" onClick={handleCancel}>Cancel</button></span>
                <span className="col-md-3">
                    <input type="text" placeholder="search students by name" value={searchText} onChange={handleSearchChange}/>
                </span>
            </div>
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
                                {searchedStudents.map((student,i)=>{
                                    return <tr key={student._id}>
                                                <td>{i+1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{ !enrolled(student._id) ? 
                                                (
                                                    <button className="btn btn-outline-success" onClick={()=>{handleEnroll(student._id)}}>Enroll</button>
                                                ) : (
                                                    <button className="btn btn-outline-danger" onClick={()=>{handleUnEnroll(student._id)}}>Un-Enroll</button>
                                                )
                                                }
                                                </td>
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