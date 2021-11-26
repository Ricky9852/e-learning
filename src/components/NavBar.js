import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";
import { adminLogged } from "../actions/adminAction";
import Account from "./admin/Account";
import StudentsCRUD from "./admin/StudentsCRUD";
import Home from "./Home";
import Login from "./Login";
import Courses from "./courses/Courses"
import Register from "./admin/Register";
import { logStudent } from "../actions/studentAction";
import AdminCoursesList from "./courses/AdminCoursesList";
import StudentCoursesList from "./courses/StudentCoursesList";
import AddForm from "./courses/AddForm";
import AdminCourseItem from "./courses/AdminCourseItem";
import StudentsRegister from "./admin/StudentsRegister";
import StudentsList from "./admin/StudentsList";
import StudentItem from "./admin/StudentItem";
import PrivateRoute from "./PrivateRoute"

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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li className="nav-item">
                        <Link to='/' className='nav-link'><h4 style={{color:'white'}}>EduComm</h4></Link>
                    </li>
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
                                    <Link to='/courses' className='nav-link'>Courses</Link>
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
                                                <Link to='/courses' className='nav-link'>Courses</Link>
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
            <PrivateRoute path='/students' isLoggedIn={isLoggedIn} component={<StudentsCRUD props={props}/>} />
            {/* <PrivateRoute path='/students/register' isLoggedIn={isLoggedIn} exact={true} component={<StudentsRegister/>} />
            <PrivateRoute path='/students/list' isLoggedIn={isLoggedIn} exact={true} component={<StudentsList props={props}/>} />
            <PrivateRoute path='/students/list/:id' isLoggedIn={isLoggedIn} component={<StudentItem id={props.match.params}/>} exact={true}/> */}
            <PrivateRoute path='/account' isLoggedIn={isLoggedIn} component={<Account/>} exact={true}/>
            <PrivateRoute path='/courses' isLoggedIn={isLoggedIn} component={<Courses/>} />
            {/* <PrivateRoute path = '/courses/admin-course-list' isLoggedIn={isLoggedIn} exact={true} component = {<AdminCoursesList/>}/>
            <PrivateRoute path = '/courses/student-course-list' isLoggedIn={isLoggedIn} exact={true} component = {<StudentCoursesList/>}/>
            <PrivateRoute path ='/courses/addcourse' isLoggedIn={isLoggedIn} component = {<AddForm/>} exact={true}/>
            <PrivateRoute path = '/courses/admin-course-list/:id' isLoggedIn={isLoggedIn} exact={true} component = {<AdminCourseItem/>}/> */}
        </div>
    )
}

const WrapperComponent = withRouter(NavBar)
export default WrapperComponent;

