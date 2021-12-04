import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,Route } from "react-router-dom";
import { startGetAdminLectures, startRemoveLectures } from "../../actions/adminLecturesAction";
import AddLecture from "./AddLecture";
import AdminLecturesItem from "./AdminLecturesItem";

const AdminLecturesList = props => {
    const {cid} = props.match.params
    // localStorage.setItem('cid',cid)
    const adminLectures = useSelector((state)=> {
        return state.adminLectures.data
    })
    const dispatch = useDispatch()
    const handleRemove = (_id) => {
        dispatch(startRemoveLectures(cid, _id))
    }
    useEffect(()=> {
        dispatch(startGetAdminLectures(cid))
    }, [])
    return (
        <div style={{textAlign:'center'}}>
            <h1> Lectures </h1>
            <Link to={`/courses/admin-course-list/cid=${cid}/lectures/add`}><button className='btn btn-primary'>Add New Lectures</button></Link><br/>
            <div>
                { adminLectures.length !==0 ? (
                    <table className='table table-striped'>
                        <thead >
                            <tr>
                                <th>No.</th>
                                <th>Lecture Title</th>
                                <th>Lecture Type</th>
                                {/* <th>Lecture Course</th> */}
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminLectures.map((lecture,i)=>{
                                    return <tr key={lecture._id}>
                                        <td>{i+1}</td>
                                        <td>{lecture.title}</td>
                                        <td>{lecture.assetType}</td>
                                        {/* <td>{lecture.course}</td> */}
                                        <td><Link to={`/courses/admin-course-list/cid=${cid}/lectures/lid=${lecture._id}`}><button className="btn btn-info">Details</button></Link></td>
                                        <td><button className="btn btn-danger" onClick={()=>{handleRemove(lecture._id)}}>Remove</button></td>
                                    </tr>
                                })}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
                
            </div>

            {/* <Route path={`/courses/admin-course-list/${cid}/lectures/:id` } component={AdminLecturesItem} exact /> */}
        </div>
    )
}

export default AdminLecturesList;