import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startAddCourses, startCoursesSetErrors } from "../../actions/adminCoursesAction";
import { Redirect } from "react-router";
import { startLecturesSetErrors } from "../../actions/adminLecturesAction";

const LecturesForm = props => {
    const { handleSubmit, cid, lid: _id, title: lTitle, description: lDescription, assetType: lAssetType, assetURL: lAssetURL, comments: lComments, students: lStudents, course: lCourse, isDelete: lIsDelete, history } = props
    const [title, setTitle] = useState( lTitle ? lTitle : '' )
    const [description, setDescription] = useState( lDescription ? lDescription : '' )
    const [assetType, setAssetType] = useState( lAssetType ? lAssetType : '' )
    const [assetURL, setAssetURL] = useState( lAssetURL ? lAssetURL : '' )
    const [comments, setComments] = useState( lComments ? lComments : '' )
    const [students, setStudents] = useState( lStudents ? lStudents :[] )
    const [course, setCourse] = useState( lCourse ? lCourse : '' )
    const [isDelete,setIsDelete] = useState( lIsDelete ? lIsDelete : false )

    const lecturesErrors = useSelector((state) => {
        return state.adminLectures.errors
    })
    const dispatch = useDispatch()

    const handleBack = () => {
        props.history.push(`/courses/admin-course-list/${cid}/lectures`)
    }
    const errors = {}

    const runValidations = () => {
        if(title.trim().length === 0){
            errors['title'] = 'lecture title cannot be blank'
        }
        if(description.length === 0){
            errors['description'] = 'lecture description cannot be blank'
        }
        if(assetType.length === 0){
            errors['assetType'] = 'lecture assetType cannot be blank'
        }
        if(assetURL.length === 0){
            errors['assetURL'] = 'lecture assetURL cannot be blank'
        }
        if(course.length === 0){
            errors['course'] = 'lecture course cannot be blank'
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        runValidations()
        const redirect = () => {
            props.history.push(`/courses/admin-course-list/${cid}/lectures`)
        }
        if(Object.keys(errors).length === 0){
            dispatch(startLecturesSetErrors({}))
            const formData = {
                // _id,
                title,
                description,
                assetType,
                assetURL,
                comments,
                students,
                course,
                isDelete
            }
            console.log('form data in course',formData)
            handleSubmit(formData, redirect)
        }else{
            dispatch(startLecturesSetErrors(errors))
            // alert(`There are following errors :
            // ${Boolean(errors['name']) ? errors['name'] : ''}
            // ${Boolean(errors['email']) ? errors['email'] : ''}
            // ${Boolean(errors['password']) ? errors['password'] : ''}`)
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'title'){
            setTitle(e.target.value)
        }else if(attr === 'description'){
            setDescription(e.target.value)
        }else if(attr === 'assetType'){
            setAssetType(e.target.value)
        }else if(attr === 'assetURL'){
            setAssetURL(e.target.value)
        }else if(attr === 'comments'){
            setComments(e.target.value)
        }else if(attr === 'students'){
            setStudents(e.target.value)
        }else if(attr === 'course'){
            setCourse(e.target.value)
        }else if(attr === 'isDelete'){
            setIsDelete(e.target.value)
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                <div className="card-body" >
                    <form className = 'g-col-4'>
                    <div className = 'mb-3' >
                        <input type = "text" value = {title} placeholder = 'Enter Lecture title*' name = 'title' onChange = {handleChange} /> <br/>
                        { lecturesErrors.title && <span style={{color:'red'}}>{lecturesErrors.title}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <input type="text" value = {description} placeholder = 'Enter Lecture description*' name = 'description' onChange = {handleChange} /> <br/>
                        { lecturesErrors.description && <span style={{color:'red'}}>{lecturesErrors.description}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <select value={assetType} name='assetType' onChange={handleChange}>
                            <option value=""> select lecture category*</option>
                            <option value="video">video</option>
                            <option value="audio">audio</option>
                            <option value="text">text</option>
                            <option value="pdf">pdf</option>
                            <option value="img">img</option>
                        </select> <br/>
                        { lecturesErrors.assetType && <span style={{color:'red'}}>{lecturesErrors.assetType}</span> }
                    </div>

                    <div className = 'mb-3' >
                        {
                            // assetType === "video" || assetType === "" || assetType === "text"  ? 
                            // ( 
                                <input type = "text" value = {assetURL} name = 'assetURL' onChange = {handleChange} placeholder = "Enter Lecture Asset Url*"/> 
                            // ) : (
                            //     <div>
                            //         <label>Select Lecture Asset :</label> 
                            //         <input type = "file" value = {assetURL} name = 'assetURL' onChange = {handleChange} />
                            //     </div>
                            // )
                        }
                        <br/>
                        { lecturesErrors.assetURL && <span style={{color:'red'}}>{lecturesErrors.assetURL}</span> }
                    </div>

                    <div>
                        {
                            Boolean(_id)===false && 
                            <div className = 'mb-3' >
                                <input type = "text" value = {comments} name = 'comments' onChange = {handleChange} placeholder = "Enter Lecture comments"/>
                            </div>
                        }
                    </div>
                    
                    <div className = 'mb-3' >
                        <input type = "text" value = {students} placeholder = 'Enter Lecture students' name = 'students' onChange = {handleChange} /> <br/>
                    </div>
                    
                    <div className = 'mb-3' >
                        <input type = "text" value = {course} name = 'course' onChange = {handleChange} placeholder = "Enter Lecture course*"/><br/>
                        { lecturesErrors.course && <span style={{color:'red'}}>{lecturesErrors.course}</span> }
                    </div>

                    <div className = 'mb-3' >
                        <label>Deletable : </label>
                        <input type="radio" value="true" name="isDelete" checked={isDelete==true} onChange={handleChange} />  Yes
                        <input type="radio" value="false" name="isDelete" checked={isDelete==false} onChange={handleChange} />  No
                    </div>

                    <button className="btn btn-outline-success" onClick={handleFormSubmit}>Save</button>
                </form>
                </div>
            </div>
            {/* <button className='btn btn-outline-secondary' onClick={handleBack}>Back</button> */}
        </div>
    )
}

export default LecturesForm;