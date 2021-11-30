import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditLecture from "./EditLecture";
import ReactPlayer from 'react-player'

const AdminLecturesItem = props => {
    const {lid, cid} = props.match.params
    const dispatch = useDispatch()
    const [toggle,setToggle] = useState(true)
    const [lecture,setLecture] = useState({})
    const handleEdit=()=>{
        setToggle(!toggle)
    }
    const handleBack = () => {
        props.history.push(`/courses/admin-course-list/${cid}/lectures`)
    }
    
    useEffect(()=> {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${lid}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setLecture(result)
                console.log('courseitem',result)
            })
            .catch((err) => {
                alert(err.message)
            })
    },[])

    return (
        <div>
            <h2>Lecture Details</h2>
                <button onClick={handleEdit} className="btn btn-outline-primary">Edit</button>
                {toggle ? (
                    <div>
                        {Object.keys(lecture).length>0 && (
                            <div>
                                <div className="card bg-light" style={{textAlign:'center', left:"475px",width:"400px"}}>
                                    <div className="card-body" >
                                        <p>Lecture Title:{lecture.title}</p>
                                        <p>Lecture Description:{lecture.description}</p>
                                        {/* <p>Lecture Course:{lecture.course}</p> */}
                                    </div>
                                </div>
                                {/* <div className="card bg-light" style={{ left:"340px" , maxWidth:"675px"}}> */}
                                <div className="card bg-light" >
                                    <div className="card-body" >
                                        {lecture.assetType === 'video' && <ReactPlayer url={lecture.assetURL} />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ):(
                    <div>
                        <EditLecture lecture={lecture} lid={lid} cid={cid} handleEdit={handleEdit} toggle={toggle}/>
                    </div>
                )}
            <button className='btn btn-outline-secondary' onClick={handleBack}>Back</button>
        </div>
        
    )
}

export default AdminLecturesItem