import React from "react";
import { Link,Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const NavBar = ( props ) => {
    return (
        <div>
            <h1>NavBar</h1>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Route path='/' component={Home} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/login' component={Login} exact/>

        </div>
    )
}

export default NavBar;
