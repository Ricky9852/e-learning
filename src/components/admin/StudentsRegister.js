import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startSetErrors } from "../../actions/adminAction";
import { startAddStudent, startStudentSetErrors } from "../../actions/adminStudentsAction"

const StudentsRegister = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAllowed,setIsAllowed] = useState(true)

    const adminErrors = useSelector((state) => {
        return state.students.errors
    })
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
        if(password.length === 0){
            errors['password'] = 'password cannot be blank'
        }else if(password.length < 6){
            errors['password'] = 'password length should be at least 6'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        const redirect = () => {
            props.history.push('/students')
        }
        if(Object.keys(errors).length === 0){
            dispatch(startStudentSetErrors({}))
            const formData = {
                name: name,
                email: email,
                password: password,
                isAllowed: isAllowed
            }
            dispatch(startAddStudent(formData))
        }else{
            dispatch(startStudentSetErrors(errors))
            // alert(`There are following errors :
            // ${Boolean(errors['name']) ? errors['name'] : ''}
            // ${Boolean(errors['email']) ? errors['email'] : ''}
            // ${Boolean(errors['password']) ? errors['password'] : ''}`)
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }else if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'password'){
            setPassword(e.target.value)
        }else if(attr === 'isAllowed'){
            setIsAllowed(e.target.value)
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                <div className="card-body" >
                <h1>Register Student</h1>
                <form onSubmit = {handleSubmit} className = 'g-col-4'>
                    <div className = 'mb-3' >
                        <input type = "text" value = {name} placeholder = 'enter student name' name = 'name' onChange = {handleChange} /> <br/>
                        { adminErrors.name && <span style={{color:'red'}}>{adminErrors.name}</span> } 
                    </div>
                    <div className = 'mb-3' >
                        <input type = "text" value = {email} placeholder = 'enter student email' name = 'email' onChange = {handleChange} /> <br/>
                        { adminErrors.email && <span style={{color:'red'}}>{adminErrors.email}</span> } 
                    </div>
                    <div className = 'mb-3' >
                        <input type = "text" value = {password} name = 'password' onChange = {handleChange} placeholder = "enter student password"/><br/>
                        { adminErrors.password && <span style={{color:'red'}}>{adminErrors.password}</span> } 
                    </div>
                    <div className = 'mb-3' >
                        <label>Allowed : </label>
                        <input type="radio" value="true" name="isAllowed" checked={isAllowed==true} onChange={handleChange} />  Yes
                        <input type="radio" value="false" name="isAllowed" checked={isAllowed==false} onChange={handleChange} />  No<br/>
                        { adminErrors.isAllowed && <span style={{color:'red'}}>{adminErrors.isAllowed}</span> } 
                    </div>
                    <button className="btn btn-outline-success" onClick={handleSubmit}>Register</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default StudentsRegister;