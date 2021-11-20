import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAdmin } from "../actions/adminAction";
import EditAdmin from "./EditAdmin";

const Account = props => {
    const [toggle,setToggle]=useState(false)
    const dispatch = useDispatch()
    const admin = useSelector((state) => {
        return state.admin.data
    })
    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.history.push('/')
        }
        // if(Object.keys(admin).length===0){
            dispatch(startGetAdmin())
        // }
    }, [])
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return (
        <div>
            {Object.keys(admin).length>0 &&
            <div>
                <h1>User Account</h1>
                <button onClick={handleToggle}>edit</button>
                {toggle ? (
                    <div>
                        <EditAdmin handleToggle={handleToggle}/>
                    </div>
                ) : (
                    <div>
                        <p>email-{admin.email}</p>
                        <p>username-{admin.username}</p>
                        <p>role-{admin.role}</p>
                        <p>academy name-{admin.academy.name}</p>
                    </div>
                )}
                {/* <div className = "card text-white bg-dark mb-3">
                    <div className = "card-header" >Email - {admin.email}</div>
                    <div className = "card-body">
                        <p className = "card-text" >Username - {admin.username}</p>
                    </div>
                </div> */}
                
                {/* <p>academy name-{Object.keys(admin.academy).length>0 && (<p>{admin.academy.name}</p>)}</p> */}
            </div>
            }
            
        </div>
    )
}

export default Account