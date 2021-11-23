import React, { useEffect, useState } from "react";
import validator from "validator";
import { useSelector,useDispatch } from "react-redux";
import { startLogAdmin, startSetErrors } from "../actions/adminAction";
import { startLogStudent } from "../actions/studentAction";

const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminButton, setAdminButton] = useState(true)
    const [studentButton, setStudentButton] = useState(false)

    // const storeErrors = useSelector((state) => {
    //     return state.user.errors
    // })

    const dispatch = useDispatch()

    const handleAdminButton = () =>{
        setAdminButton(true)
        setStudentButton(false)
    }
    const handleStudentButton = () =>{
        setAdminButton(false)
        setStudentButton(true)
    }

    const errors = {}

    const runValidations = () => {
        if(email.trim().length === 0){
            errors['email'] = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors['email'] = 'invalid email format'
        }if(password.length === 0){
            errors['password'] = 'password cannot be blank'
        }else if(password.length < 6){
            errors['password'] = 'password length should be at least 6'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        const redirect = () => {
            props.history.push('/')
        }
        if(Object.keys(errors).length === 0){
            const formData = {
                email: email,
                password: password
            }
            if(adminButton){
                dispatch(startLogAdmin(formData, redirect))
            }else if(studentButton){
                dispatch(startLogStudent(formData, redirect))
            }
        }else{
            dispatch(startSetErrors(errors))
            alert(`There are following errors : 
            ${Boolean(errors['email']) ? errors['email'] : ''}
            ${Boolean(errors['password']) ? errors['password'] : ''}`)
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'password'){
            setPassword(e.target.value)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <h3>User Type : { (adminButton) ? <>Admin</> : <>Student</>}</h3><button onClick={handleAdminButton}>Admin</button><button onClick={handleStudentButton}>Student</button>
            <form onSubmit = {handleSubmit} className = 'g-col-4'>
            <div className = 'mb-3' >
                <input type = "text" value = {email} placeholder = 'enter your email' name = 'email' onChange = {handleChange} /> 
            </div>

            <div className = 'mb-3'>
                <input type = "password" value = {password} name = 'password' onChange = {handleChange} placeholder = "enter your password"/>
            </div>

                <input type = "submit" value = "Login" />
            </form>
        </div>
    )
}

export default Login;