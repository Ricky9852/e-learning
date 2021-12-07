import React,{useEffect,useState} from "react";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { startAddAdmin, startSetErrors } from "../../actions/adminAction";

const Register = props => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [academy, setAcademy] = useState({name:'',website:''})

    // const storeErrors = useSelector((state) => {
    //     return state.user.errors
    // })
    const dispatch = useDispatch()

    const adminErrors = useSelector((state) => {
        return state.admin.errors
    })
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
        if(password.length === 0){
            errors['password'] = 'password cannot be blank'
        }else if(password.length < 6){
            errors['password'] = 'password length should be at least 6'
        }
        if(academy.name.trim().length === 0){
            errors['academy'] = 'academy name cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        const redirect = () => {
            props.history.push('/login')
        }
        if(Object.keys(errors).length === 0){
            dispatch(startSetErrors({}))
            const formData = {
                username: username,
                email: email,
                password: password,
                academy: {
                    name: academy.name,
                    website: academy.website
                }
            }
            dispatch(startAddAdmin(formData, redirect))
        }else{
            dispatch(startSetErrors(errors))
            // alert(`There are following errors :
            // ${Boolean(errors['username']) ? errors['username'] : ''}
            // ${Boolean(errors['email']) ? errors['email'] : ''}
            // ${Boolean(errors['password']) ? errors['password'] : ''}
            // ${Boolean(errors['academy']) ? errors['academy'] : ''}`)
        }
        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'username'){
            setUsername(e.target.value)
        }else if(attr === 'email'){
            setEmail(e.target.value)
        }else if(attr === 'password'){
            setPassword(e.target.value)
        }else if(attr === 'academyName'){
            setAcademy({...academy, name:e.target.value})
        }else if(attr === 'academyWebsite'){
            setAcademy({...academy, website:e.target.value})
        }
    }

    return (
        <div >
                <div className="mx-auto card bg-light" style={{textAlign:'center', width:"400px"}}>
                <div className="card-body" >
                <h1>Register</h1>
                <form className = 'g-col-4'>
                    <div className = 'mb-3' >
                        <input type = "text" value = {username} placeholder = 'enter your username*' name = 'username' onChange = {handleChange} />  <br/>
                        { adminErrors.username && <span style={{color:'red'}}>{adminErrors.username}</span> } 
                    </div>

                    <div className = 'mb-3' >
                        <input type = "text" value = {email} placeholder = 'enter your email*' name = 'email' onChange = {handleChange} /> <br/>
                        { adminErrors.email && <span style={{color:'red'}}>{adminErrors.email}</span> } 
                    </div>

                    <div className = 'mb-3' >
                        <input type = "password" value = {password} name = 'password' onChange = {handleChange} placeholder = "enter your password*"/><br/>
                        { adminErrors.password && <span style={{color:'red'}}>{adminErrors.password}</span> } 
                    </div>

                    <div className = 'mb-3' >
                        <input type = "text" value = {academy.name} placeholder = 'enter the academy name*' name = 'academyName' onChange = {handleChange} /> <br/>
                        { adminErrors.academy && <span style={{color:'red'}}>{adminErrors.academy}</span> } 
                    </div>

                    <div className = 'mb-3' >
                        <input type = "text" value = {academy.website} placeholder = 'enter the academy website' name = 'academyWebsite' onChange = {handleChange} /> <br/>
                        {/* { adminErrors.academy.website && <span style={{color:'red'}}>{adminErrors.academy.website}</span> }  */}
                    </div>

                    <button className="btn btn-outline-success" onClick={handleSubmit}>Register</button>
                </form>
                </div>
            </div>
        </div>
        
    )
}

// import React from 'react';
// import { useFormik, yupToFormErrors } from 'formik';
// import * as Yup from 'yup';

// const Register = () => {
//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             email: '',
//             password: '',
//             academy: {
//                 name: '',
//                 website: ''
//         }
//     },
//     validationSchema: Yup.object({
//         username: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//         email: Yup.string().email('Invalid email address').required('Required'),
//         password: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('Required'),
//         academy: Yup.object({
//             name: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//         })
//     }),
//     onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         },
//     });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="username">User Name</label>
//         <input
//             id="username"
//             name="username"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//         />
//         {formik.touched.username && formik.errors.username ? (
//             <div>{formik.errors.username}</div>
//         ) : null}
//         <br />

//         <label htmlFor="email">Email Address</label>
//         <input
//             id="email"
//             name="email"
//             type="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//         />
//         {formik.touched.email && formik.errors.email ? (
//             <div>{formik.errors.email}</div>
//         ) : null}
//         <br />

//         <label htmlFor="password">password</label>
//             <input
//                 id="password"
//                 name="password"
//                 type="text"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//             />
//             {formik.touched.password && formik.errors.password ? (
//                 <div>{formik.errors.password}</div>
//             ) : null}
//             <br />
        
//         {/* <label htmlFor="name">Adademy Name</label>
//             <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.academy.name}
//             />
//             {formik.touched.academy.name && formik.errors.academy.name ? (
//                 <div>{formik.errors.academy.name}</div>
//             ) : null}
//             <br /> */}

//         {/* <label htmlFor="name">Adademy Website</label>
//             <input
//                 id="website"
//                 name="website"
//                 type="text"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.academy.website}
//             />
//             {formik.touched.academy.website && formik.errors.academy.website ? (
//                 <div>{formik.errors.academy.website}</div>
//             ) : null}
//             <br /> */}

//         <button type="submit">Submit</button>
//     </form>
//     );
//     };

export default Register;