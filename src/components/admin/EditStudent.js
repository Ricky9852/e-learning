import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startSetErrors } from "../../actions/adminAction";
import { startAddStudent, startEditStudent } from "../../actions/adminStudentsAction"

const EditStudent = props => {
    const { id, student,handleEdit } = props
    const [name, setName] = useState(student.name ? student.name : '')
    const [email, setEmail] = useState(student.email ? student.email : '')
    const [isAllowed,setIsAllowed] = useState(student.isAllowed ? student.isAllowed : true)
    // console.log('student in edit',student);

    const handleCancel=()=>{
        handleEdit()
    }

    // const storeErrors = useSelector((state) => {
    //     return state.user.errors
    // })
    const dispatch = useDispatch()

    const errors = {}

    const runValidations = () => {
        if(name.trim().length === 0){
            errors['name'] = 'name cannot be blank'
        }else if(name.length < 5){
            errors['name'] = 'name length should be at least 5'
        }
        if(email.trim().length === 0){
            errors['email'] = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors['email'] = 'invalid email format'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        const toggle = () => {
            handleEdit()
        }
        if(Object.keys(errors).length === 0){
            dispatch(startSetErrors({}))
            const formData = {
                name: name,
                email: email,
                isAllowed: isAllowed
            }
            dispatch(startEditStudent(id, formData))
            handleEdit()
        }else{
            dispatch(startSetErrors(errors))
            alert(`There are following errors :
            ${Boolean(errors['name']) ? errors['name'] : ''}
            ${Boolean(errors['email']) ? errors['email'] : ''}`)
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }else if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'isAllowed'){
            setIsAllowed(e.target.value)
        }
    }

    return (
        <div>
            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                <div className="card-body" >
                <h3>Edit Student:{student.name}</h3>
                    <form className = 'g-col-4'>
                        <div className = 'mb-3' >
                            <input type = "text" value = {name} placeholder = 'enter student name' name = 'name' onChange = {handleChange} /> 
                        </div>

                        <div className = 'mb-3' >
                            <input type = "text" value = {email} placeholder = 'enter student email' name = 'email' onChange = {handleChange} /> 
                        </div>

                        <div className = 'mb-3' >
                            <label>Allowed : </label>
                            <input type="radio" value="true" name="isAllowed" checked={isAllowed==true} onChange={handleChange} />  Yes
                            <input type="radio" value="false" name="isAllowed" checked={isAllowed==false} onChange={handleChange} />  No
                        </div>

                        <button className="btn btn-outline-success" onClick={handleSubmit}>Save</button>
                        <button onClick={handleCancel} className="btn btn-outline-danger">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditStudent;