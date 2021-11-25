import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import StudentsList from "./StudentsList";
import StudentsRegister from "./StudentsRegister";
import StudentItem from "./StudentItem";

const AdminNav = props =>{
    return (
        <div>
            {/* <Link to='/'>Students</Link> */}
            <Link to='/students/register'><button className='btn btn-primary'>Register new student</button></Link>
            <Link to='/students/list'><button className='btn btn-primary'>students list</button></Link>
            {/* <Route path='/' exact component={StudentCRUD} /> */}
            <Route path='/students/register' exact component={StudentsRegister} />
            <Route path='/students/list' exact component={StudentsList} />
            <Route path='/students/list/:id' component={StudentItem} exact/>
            
        </div>
    )
}

const WrapperStudentComponent = withRouter(AdminNav)
export default WrapperStudentComponent;