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
    const studentIsLoggedIn = useSelector((state) => {
        return state.studentIsLoggedIn
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminLogged())
        dispatch(logStudent())
    }, [])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    {
                        isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link to='/account' className='nav-link'>Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/students' className='nav-link'>Students</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to = '#' className='nav-link' onClick = {()=>{
                                        localStorage.removeItem('token')
                                        props.history.push('/')
                                        dispatch(adminLogged())
                                        alert('successfullly logged out')
                                    }}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {
                                    studentIsLoggedIn ? (
                                        <>  
                                            <li className="nav-item">
                                                <Link to='/student/courses' className='nav-link'>Courses</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to = '#' className='nav-link' onClick = {()=>{
                                                    localStorage.removeItem('stoken')
                                                    props.history.push('/')
                                                    dispatch(logStudent())
                                                    alert('successfullly logged out')
                                                }}>Logout</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link to='/register' className='nav-link'>Register</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to='/login' className='nav-link'>Login</Link>
                                            </li>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </ul>
                </div>
            </div>
            </nav>
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

