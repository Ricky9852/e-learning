import React, { useEffect } from "react";
import { Link,Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogged } from "../../actions/adminAction";
import { logStudent } from "../../actions/studentAction";
import AdminCoursesList from "./AdminCoursesList";
import StudentCoursesList from "./StudentCoursesList";
import AddForm from "./AddForm";
import AdminCourseItem from "./AdminCourseItem";

const Courses = ( props ) => {
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
        <div style={{textAlign:'center'}}>
            <h1>Courses</h1>
            { isLoggedIn && <div>
                <Link to = '/courses/admin-course-list'><button className = 'btn btn-primary'>Course List</button></Link>
                <Link to = '/courses/addcourse'><button className = 'btn btn-primary'>Add New Course</button></Link>
            </div> }
            { studentIsLoggedIn && <Link to = '/courses/student-course-list'><button className = 'btn btn-primary'>Course List</button></Link> }

            <Route path = '/courses/admin-course-list' exact component = {AdminCoursesList}/>
            <Route path = '/courses/student-course-list' exact component = {StudentCoursesList}/>
            <Route path ='/courses/addcourse' component = {AddForm} exact/>
            <Route path = '/courses/admin-course-list/:id' exact component = {AdminCourseItem}/>
        </div>
    )
}

export default Courses;
