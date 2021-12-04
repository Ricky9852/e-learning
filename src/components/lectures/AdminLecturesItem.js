import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditLecture from "./EditLecture";
import ReactPlayer from 'react-player'
import { Worker,Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { startGetSingleAdminLecture } from "../../actions/adminLecturesAction";

const AdminLecturesItem = props => {
    const {lid, cid} = props.match.params
    const zoomPluginInstance = zoomPlugin();
    const dispatch = useDispatch()
    const [toggle,setToggle] = useState(true)
    const [lecture,setLecture] = useState({})
    const handleEdit=()=>{
        setToggle(!toggle)
    }
    const handleBack = () => {
        props.history.push(`/courses/admin-course-list/${cid}/lectures`)
    }
    const handleSetLecture = (lectureData) => {
        setLecture(lectureData)
    }
    useEffect(()=> {
        // axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${cid}/lectures/${lid}`, {
        //     headers: {
        //         'Authorization': localStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         const result = response.data
        //         setLecture(result)
        //         console.log('lectureitem',result)
        //     })
        //     .catch((err) => {
        //         alert(err.message)
        //     })
        // if(Object.keys(lecture).length===0){
            dispatch(startGetSingleAdminLecture(cid, lid, handleSetLecture))
        // }
        
    },[toggle])

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
                                {lecture.assetType === 'video' && 
                                    <div className="card bg-light" >
                                        <div className="card-body" >
                                            {lecture.assetType === 'video' && <ReactPlayer url={lecture.assetURL} />}
                                        </div>
                                    </div>
                                }
                                
                                {lecture.assetType === 'pdf' && 
                                            <div
                                                style={{
                                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                                    height: '650px'
                                                }}
                                            >
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                                <Viewer fileUrl={lecture.assetURL} plugins={[zoomPluginInstance]}/>
                                            </Worker>
                                            </div>
                                }
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