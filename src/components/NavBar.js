import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";
import { adminLogged } from "../actions/adminAction";
import Account from "./Account";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const NavBar = ( props ) => {
    const isLoggedIn = useSelector( (state) => {
        return state.isLoggedIn
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(adminLogged())
    }, [])
    return (
        <div>
            <h1>NavBar</h1>
            <Link className = 'list-group-item list-group-item-action' to='/'>Home</Link>
            {
                isLoggedIn ? (
                    <>
                        <Link className = 'list-group-item list-group-item-action' to = '/account'>Account</Link>
                        <Link className = 'list-group-item list-group-item-action' to = '#' onClick = {()=>{
                            localStorage.removeItem('token')
                            props.history.push('/')
                            dispatch(adminLogged())
                            alert('successfullly logged out')
                        }}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link className = 'list-group-item list-group-item-action' to = '/register'>Register</Link>
                        <Link className = 'list-group-item list-group-item-action' to = '/login'>Login</Link>
                    </> 
                )
            }

            <Route path='/' component={Home} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/account' component={Account} exact/>
        </div>
    )
}

const WrapperComponent = withRouter(NavBar)
export default WrapperComponent;

