import React, { useEffect } from "react";
import { Link,Route,Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogged } from "../../actions/adminAction";
import { logStudent } from "../../actions/studentAction";
import AdminCoursesList from "./AdminCoursesList";
import StudentCoursesList from "./StudentCoursesList";
import AddForm from "./AddForm";
import AdminCourseItem from "./AdminCourseItem";
import AdminLecturesList from "../lectures/AdminLecturesList";
import AddLecture from "../lectures/AddLecture";
import AdminLecturesItem from "../lectures/AdminLecturesItem";
import StudentCourseItem from "./StudentCourseItem";
import StudentLecturesList from "../lectures/StudentsLecturesList";
import StudentLecturesItem from "../lectures/StudentLecturesItem";

const Courses = ( props ) => {
    const isLoggedIn = useSelector((state) => {
        return state.isLoggedIn
    })
    const studentIsLoggedIn = useSelector((state) => {
        return state.studentIsLoggedIn
    })
    const dispatch = useDispatch()
    const cid = localStorage.getItem('cid')
    useEffect(() => {
        dispatch(adminLogged())
        dispatch(logStudent())
    }, [])
    return (
        <div>
            <div className="row" >
                <div className="col-md-3" >
                    {/* <h1>Courses</h1> */}
                </div>
                <span className="col-md-6"></span>
                <div className="col-md-3">
                    { isLoggedIn && <div>
                        {/* <Link to = '/courses/admin-course-list'><button className = 'btn btn-outline-primary'>Course List</button></Link> */}
                        {/* <Link to = '/courses/addcourse'><button className = 'btn btn-outline-primary'>Add New Course</button></Link> */}
                    </div> }
                    {/* { studentIsLoggedIn && <Link to = '/courses/student-course-list'><button className = 'btn btn-primary'>Course List</button></Link> } */}
                </div>
            </div>
            
            <Switch>
                <Route path = '/courses/admin-course-list' exact component = {AdminCoursesList}/>
                <Route path = '/courses/student-course-list' exact component = {StudentCoursesList}/>
                <Route path = '/courses/student-course-list/cid=:cid' exact component = {StudentCourseItem}/>
                <Route path = {`/courses/student-course-list/cid=:cid/lectures`} exact component = {StudentLecturesList}/>
                <Route path = {`/courses/student-course-list/cid=:cid/lectures/lid=:lid` } component={StudentLecturesItem}/>
                <Route path ='/courses/addcourse' component = {AddForm} exact/>
                <Route path = '/courses/admin-course-list/cid=:cid' exact component = {AdminCourseItem}/>
                <Route path = {`/courses/admin-course-list/cid=:cid/lectures`} exact component = {AdminLecturesList}/>
                <Route path = {`/courses/admin-course-list/cid=:cid/lectures/add`} exact component = {AddLecture}/>
                <Route path = {`/courses/admin-course-list/cid=:cid/lectures/lid=:lid` } exact component={AdminLecturesItem}/>
            </Switch>
            
        </div>
    )
}

export default Courses;
