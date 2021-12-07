import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAdmin } from "../../actions/adminAction";
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
        <div style={{textAlign:'center'}}>
            {Object.keys(admin).length !==0 ?
            (
                <div>
                <h1>User Account</h1>
                <button className="btn btn-outline-primary" onClick={handleToggle}>Edit</button>
                {toggle ? (
                    <div>
                        <EditAdmin handleToggle={handleToggle}/>
                    </div>
                ) : (
                    <div>
                        <div className="mx-auto card bg-light" style={{textAlign:'center',width:"400px"}}>
                            <div className="card-body" >
                                <h1>Admin Details</h1>
                                <p>Username-{admin.username}</p>
                                <p>Email-{admin.email}</p>
                                <p>Academy Name-{admin.academy.name}</p>
                                <p>Academy Website-{admin.academy.website}</p>
                                <p>Role-{admin.role}</p>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            ) : (
                <p>Loading...</p>
            )
            }
            
        </div>
    )
}

export default Account