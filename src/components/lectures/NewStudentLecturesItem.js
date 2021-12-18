import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactPlayer from 'react-player'
import { Worker,Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { startGetSingleStudentLecture } from "../../actions/studentLecturesAction";

const NewStudentLecturesItem = props => {
    const {lid, cid, handleBack: handleReverse} = props
    const zoomPluginInstance = zoomPlugin();
    const dispatch = useDispatch()
    const [lecture,setLecture] = useState({})
    const handleBack = () => {
        // props.history.push(`/courses/student-course-list/cid=${cid}/lectures`)
        handleReverse()
    }
    const handleSetLecture = (lectureData) => {
        setLecture(lectureData)
    }
    useEffect(()=> {
        // if(Object.keys(lecture).length===0){
            dispatch(startGetSingleStudentLecture(cid, lid, handleSetLecture))
        // }
    },[lid])

    return (
        <div >
            {/* <h2>Lecture Details</h2> */}
            <h2>{lecture.title}</h2>
                    <div>
                        {Object.keys(lecture).length !==0 ? (
                            <div>
                                {/* <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                                    <div className="card-body" >
                                        <p>Lecture Title:{lecture.title}</p>
                                        <p>Lecture Description:{lecture.description}</p>
                                    </div>
                                </div> */}
                                {/* <div className="card bg-light" style={{ left:"340px" , maxWidth:"675px"}}> */}
                                {lecture.assetType === 'video' && 
                                    <div className="mx-auto card bg-light" style={{maxWidth:'800px'}}>
                                        <div className="mx-auto card-body" >
                                            {/* {lecture.assetType === 'video' && <ReactPlayer width={'auto'} height={'auto'} url={lecture.assetURL} />} */}
                                            {lecture.assetType === 'video' && <ReactPlayer url={lecture.assetURL} />}
                                        </div>
                                    </div>
                                }
                                
                                {lecture.assetType === 'pdf' && 
                                            <div className="mx-auto"
                                                style={{
                                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                                    height: '650px',
                                                    maxWidth:'auto'
                                                    
                                                }}
                                            >
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                                                <Viewer fileUrl={lecture.assetURL} plugins={[zoomPluginInstance]}/>
                                            </Worker>
                                            </div>
                                }
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
            {/* <button className='btn btn-outline-secondary' onClick={handleBack}>Back</button> */}
        </div>
        
    )
}

export default NewStudentLecturesItem