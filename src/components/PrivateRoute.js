import React from "react";

import { Redirect,Route } from "react-router";

const PrivateRoute = props => {
    const { path, component, exact, isLoggedIn } = props

    return (
        <Route path={path} exact={exact} >
            { localStorage.getItem('token') ? component : <Redirect to="/login"/> }
        </Route>
    )
}

export default PrivateRoute