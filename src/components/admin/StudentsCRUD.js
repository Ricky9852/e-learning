import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminNav from './AdminNav'

const StudentsCRUD = props =>{
    // const { props } = props
    return (
        <div style={{textAlign:'center'}}>
            <AdminNav props={props}/>
        </div>
    )
}

export default StudentsCRUD