import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,Route } from "react-router-dom";
import { startGetStudentLectures } from "../../actions/studentLecturesAction";
import NewStudentLecturesItem from "./NewStudentLecturesItem";
// import './StudentLecturesList.css'

const StudentLecturesList = props => {
    const {cid} = props.match.params
    const [show,setShow] = useState(false)
    const [lectureID,setLectureID] =useState('')
    // localStorage.setItem('cid',cid)
    const studentLectures = useSelector((state)=> {
        return state.studentLectures.data
    })
    let lid=''
    const handleShow = (lecture) =>{
        setShow(false)
        lid=lecture._id
        setLectureID(lid)
        setShow(true)
    }
    const handleBack = () => {
        props.history.push(`/courses/student-course-list/cid=${cid}/lectures`)
    }
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(startGetStudentLectures(cid))
    }, [])
    return (
        <div style={{textAlign:'center'}} className="row">
            {/* <h1> Lectures </h1> */}
            <div className="col-md-2 sidebar">
                {studentLectures.map((lecture,i)=>{
                    return <div key={lecture._id}>
                        <a onClick={()=>{handleShow(lecture)}}>{lecture.title.toUpperCase()}</a>
                    </div>
                })}
            </div>
            <div className="col-md-10 ms-auto" style={{alignItems:'center'}}>
                {
                    show && <NewStudentLecturesItem lid={lectureID} cid={cid} handleBack={handleBack}/>
                }
            </div>
            {/* <div>
                { studentLectures.length !==0 ? (
                    <table className='table table-striped'>
                        <thead >
                            <tr>
                                <th>No.</th>
                                <th>Lecture Title</th>
                                <th>Lecture Type</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentLectures.map((lecture,i)=>{
                                    return <tr key={lecture._id}>
                                        <td>{i+1}</td>
                                        <td>{lecture.title}</td>
                                        <td>{lecture.assetType}</td>
                                        <td><Link to={`/courses/student-course-list/cid=${cid}/lectures/lid=${lecture._id}`}><button className="btn btn-info">Details</button></Link></td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div> */}
        </div>
    )
}

export default StudentLecturesList;