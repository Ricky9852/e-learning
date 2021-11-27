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
            {Object.keys(admin).length>0 &&
            <div>
                <h1>User Account</h1>
                <button className="btn btn-outline-primary" onClick={handleToggle}>Edit</button>
                {toggle ? (
                    <div>
                        <EditAdmin handleToggle={handleToggle}/>
                    </div>
                ) : (
                    <div>
                        <div className=" card bg-light" style={{textAlign:'center', left:"480px",width:"400px"}}>
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