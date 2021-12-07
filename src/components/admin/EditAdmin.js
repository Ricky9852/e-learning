import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startEditAdmin, startSetErrors } from "../../actions/adminAction";

const EditAdmin = props => {
    const { handleToggle }=props

    const admin = useSelector((state) => {
        return state.admin.data
    })

    const adminErrors = useSelector((state) => {
        return state.admin.errors
    })

    const handleCancel = () => {
        handleToggle()
    }
    const [username, setUsername] = useState(admin.username ? admin.username : '')
    const [email, setEmail] = useState(admin.email ? admin.email : '')
    const [academy, setAcademy] = useState({name: admin.academy.name ? admin.academy.name : '', website: admin.academy.website ? admin.academy.website : ''})

    const dispatch = useDispatch()

    const errors = {}

    const runValidations = () => {
        if(username.trim().length === 0){
            errors['username'] = 'name cannot be blank'
        }else if(username.length < 5){
            errors['username'] = 'username length should be at least 5'
        }
        if(email.trim().length === 0){
            errors['email'] = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors['email'] = 'invalid email format'
        }
        if(academy.name.trim().length === 0){
            errors['academy'] = 'academy name cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length === 0){
            dispatch(startSetErrors({}))
            const formData = {
                username: username,
                email: email,
                academy: {
                    name: academy.name,
                    website: academy.website
                }
            }
            dispatch(startEditAdmin(formData, handleToggle))
        }else{
            dispatch(startSetErrors(errors))
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'username'){
            setUsername(e.target.value)
        }else if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'academyName'){
            setAcademy({...academy, name:e.target.value})
        }else if(attr === 'academyWebsite'){
            setAcademy({...academy, website:e.target.value})
        }
    }

    return (
        <div>
            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                <div className="card-body" >
                    <h1>Edit Account</h1>
                        <form className = 'g-col-4'>
                            <div className = 'mb-3' >
                                <input type = "text" value = {username} placeholder = 'enter your username*' name = 'username' onChange = {handleChange} /><br/>
                                { adminErrors.username && <span style={{color:'red'}}>{adminErrors.username}</span> } 
                            </div>

                            <div className = 'mb-3' >
                                <input type = "text" value = {email} placeholder = 'enter your email*' name = 'email' onChange = {handleChange} /> <br/>
                                { adminErrors.email && <span style={{color:'red'}}>{adminErrors.email}</span> } 
                            </div>

                            <div className = 'mb-3' >
                                <input type = "text" value = {academy.name} placeholder = 'enter the academy name*' name = 'academyName' onChange = {handleChange} /> <br/>
                                { adminErrors.academy.name && <span style={{color:'red'}}>{adminErrors.academy}</span> } 
                            </div>

                            <div className = 'mb-3' >
                                <input type = "text" value = {academy.website} placeholder = 'enter the academy website' name = 'academyWebsite' onChange = {handleChange} />  <br/>
                            </div>

                            <button className="btn btn-outline-success" onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancel} className="btn btn-outline-danger">Cancel</button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default EditAdmin