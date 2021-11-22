import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";
import { adminLogged } from "../actions/adminAction";
import Account from "./admin/Account";
import StudentsCRUD from "./admin/StudentsCRUD";
import Home from "./Home";
import Login from "./Login";
import Courses from "./student/Courses"
import Register from "./admin/Register";
import { logStudent } from "../actions/studentAction";

const NavBar = ( props ) => {
    const isLoggedIn = useSelector((state) => {
        return state.isLoggedIn
    })
    const studentIsLoggedIn = false
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminLogged())
    }, [])
    return (
        <div>
            <h1>NavBar</h1>
            <Link to='/'><button className='btn btn-primary'>Home</button></Link>
            {
                isLoggedIn ? (
                    <>
                        <Link to = '/account'><button className='btn btn-primary'>Account</button></Link>
                        <Link to = '/students'><button className='btn btn-primary'>Students</button></Link>
                        <Link to = '#' onClick = {()=>{
                            localStorage.removeItem('token')
                            props.history.push('/')
                            dispatch(adminLogged())
                            alert('successfullly logged out')
                        }}><button className='btn btn-primary'>Logout</button></Link>
                    </>
                ) : (
                    <>
                        {
                            studentIsLoggedIn ? (
                                <>  
                                    <Link to='/student/courses'>Courses</Link>
                                    <Link to = '#' onClick = {()=>{
                                        localStorage.removeItem('stoken')
                                        props.history.push('/')
                                        dispatch(logStudent())
                                        alert('successfullly logged out')
                                    }}><button className='btn btn-primary'>Logout</button></Link>
                                </>
                            ) : (
                                <>
                                    <Link to = '/register'><button className='btn btn-primary'>Register</button></Link>
                                    <Link to = '/login'><button className='btn btn-primary'>Login</button></Link>
                                </>
                            )
                        }
                    </>
                )
            }

            <Route path='/' component={Home} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/students' component={StudentsCRUD}/>
            <Route path='/account' component={Account} exact/>
            <Route path='/student/courses' component={Courses} exact/>
        </div>
    )
}

const WrapperComponent = withRouter(NavBar)
export default WrapperComponent;

