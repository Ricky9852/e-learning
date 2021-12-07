import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,Route } from "react-router-dom";
import { startGetStudentLectures } from "../../actions/studentLecturesAction";

const StudentLecturesList = props => {
    const {cid} = props.match.params
    // localStorage.setItem('cid',cid)
    const studentLectures = useSelector((state)=> {
        return state.studentLectures.data
    })
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(startGetStudentLectures(cid))
    }, [])
    return (
        <div style={{textAlign:'center'}}>
            <h1> Lectures </h1>
            <div>
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
            </div>
        </div>
    )
}

export default StudentLecturesList;