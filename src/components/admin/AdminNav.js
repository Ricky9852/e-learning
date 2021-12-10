import React from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import StudentsList from "./StudentsList";
import StudentsRegister from "./StudentsRegister";
import StudentItem from "./StudentItem";

const AdminNav = props =>{
    return (
        <div>
            <div className="row">
                <div className="col-md-3" >
                    <h1>Students</h1>
                </div>
                <span className="col-md-6"></span>
                <div className="col-md-3">
                    {/* <Link to='/students/list'><button className='btn btn-outline-primary'>Students' List</button></Link> */}
                    {/* <Link to='/students/register'><button className='btn btn-outline-primary'>Register New Student</button></Link> */}
                </div>
            </div>
            
            {/* <Link to='/'>Students</Link> */} 
            
            {/* <Route path='/' exact component={StudentCRUD} /> */}
            <Switch>
                <Route path='/students/register' exact component={StudentsRegister} />
                <Route path='/students/list' exact component={StudentsList} />
                <Route path='/students/list/sid=:id' component={StudentItem} exact/>
            </Switch>
            
        </div>
    )
}

const WrapperStudentComponent = withRouter(AdminNav)
export default WrapperStudentComponent;