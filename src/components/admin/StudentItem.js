import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditStudent from "./EditStudent";

const StudentItem = props =>{
    const {id} = props.match.params
    const [toggle,setToggle] = useState(true)
    const [student,setStudent] = useState({})
    const handleEdit=()=>{
        setToggle(!toggle)
    }
    console.log('studentitem',student);
    const students = useSelector((state)=>{
        return state.students.data
    })
    useEffect(()=>{
        axios.get(`https://dct-e-learning.herokuapp.com/api/students/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log('studentitem',result)
                setStudent(result)
            })
            .catch((err) => {
                alert(err.message)
            })
        // const result=students.find((ele)=>{
        //     return ele._id===id
        // })
        // localStorage.removeItem('student')
        // localStorage.setItem('student',JSON.stringify(result))
        // // setStudent(JSON.parse(localStorage.getItem('student')))
    },[])
    // console.log(localStorage.getItem('student'));
    return (
        <div>
            {/* <button onClick={props.history.push('/students')}>Back</button> */}
            <div style={{textAlign:'center'}}>
                <h2>Student Details</h2>
                <button onClick={handleEdit}>Edit</button>
                {toggle ? (
                    <div>
                        {Object.keys(student).length>0 && (
                            <div>
                                <p>Name:{student.name}</p>
                                <p>Email:{student.email}</p>
                                {/* <p>Password:{student.password}</p> */}
                                <p>Allowed:{String(student.isAllowed)}</p>
                                <p>Role:{student.role}</p>
                                <div>Courses:
                                    <ul>
                                        {student.courses.map((ele,i)=>{
                                            return <li key={i}>{ele.course}</li>
                                        })}
                                    </ul>
                                </div>
                                {/* <p>User:{student.user}</p> */}
                                {/* <p>Created At:{student.createdAt}</p> */}
                                {/* <p>Updated At:{student.updatedAt}</p> */}
                            </div>
                        )}
                    </div>
                ):(
                    <div>
                        <EditStudent student={student} id={id} handleEdit={handleEdit} toggle={toggle}/>
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default StudentItem