import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startSetErrors } from "../../actions/adminAction";
import { startAddStudent } from "../../actions/adminStudentsAction"

const StudentsRegister = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAllowed,setIsAllowed] = useState(true)

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
            dispatch(startSetErrors({}))
            const formData = {
                name: name,
                email: email,
                password: password,
                isAllowed: isAllowed
            }
            dispatch(startAddStudent(formData))
        }else{
            dispatch(startSetErrors(errors))
            alert(`There are following errors :
            ${Boolean(errors['name']) ? errors['name'] : ''}
            ${Boolean(errors['email']) ? errors['email'] : ''}
            ${Boolean(errors['password']) ? errors['password'] : ''}`)
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
            <h1>Register Student</h1>
            <form onSubmit = {handleSubmit} className = 'g-col-4'>
                <div className = 'mb-3' >
                    <input type = "text" value = {name} placeholder = 'enter student name' name = 'name' onChange = {handleChange} /> 
                </div>

                <div className = 'mb-3' >
                    <input type = "text" value = {email} placeholder = 'enter student email' name = 'email' onChange = {handleChange} /> 
                </div>

                <div className = 'mb-3' >
                    <input type = "text" value = {password} name = 'password' onChange = {handleChange} placeholder = "enter student password"/>
                </div>

                <div className = 'mb-3' >
                    <label>Allowed : </label>
                    <input type="radio" value="true" name="isAllowed" checked={isAllowed==true} onChange={handleChange} />  Yes
                    <input type="radio" value="false" name="isAllowed" checked={isAllowed==false} onChange={handleChange} />  No
                </div>

                <input type = "submit" value = "Register" />
            </form>
        </div>
    )
}

export default StudentsRegister;