import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAdmin } from "../actions/adminAction";

const Account = props => {
    const dispatch = useDispatch()
    const admin = useSelector((state) => {
        return state.admin.data
    })
    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/')
        }
        dispatch(startGetAdmin())
    }, [])
    return (
        <div>
            <h1>User Account</h1>
            <div className = "card text-white bg-dark mb-3">
                <div className = "card-header" >Email - {admin.email}</div>
                <div className = "card-body">
                    <p className = "card-text" >Username - {admin.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Account