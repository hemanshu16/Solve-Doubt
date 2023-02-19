import React, { useState, useEffect } from "react";

import { Link, useParams } from 'react-router-dom';
// import "../Users/generalquestions.css";

export default function VerifyRequests(props) {

    const [users, setUsers] = useState([])

    async function getdata() {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }

        let response = await fetch(`http://localhost:5000/api/user/`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.text();
        data = JSON.parse(data)
        console.log(data)
        setUsers(data.users)
    }
    useEffect(() => {
        getdata();
    }, [])

    const comp = users.map((user) => {
        return (
            <>
                <div className="row">
                    <div className="col-4">
                        <h5 className="card-title">{user.name.firstname + " " + user.name.lastname}</h5>
                    </div>
                    <div className="col-4">
                        <p className="card-title">{user.approved}</p>
                    </div>

                    <div className="col-4">
                        <Link to={'/VC/VerifyProfile/' + user._id}  className="linktoprofile" >
                            View Profile
                        </Link>
                    </div>
                </div>

                <hr />
            </>

        )
    })

    return (
        <>
            <div className="container">
                <div className="row d-flex flex-column align-items-center">

                    <div className="col-4 mt-4">
                        <select className="form-select" aria-label="Default select example" value="1">
                            <option selected>Sort The Issues</option>
                            <option value="1">By Verifed</option>
                            <option value="2">By Rejected</option>
                            <option value="3">By Date (Newest First)</option>
                            <option value="4">By Date (Oldest First)</option>
                        </select>
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center ">
                    <div className="col-8 mt-4 issue">
                        <div className="card" >
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <h5 className="card-title">User Name</h5>
                                    </div>
                                    <div className="col-4">
                                        <p className="card-title">Status</p>
                                    </div>
                                    <div className="col-4">
                                        <Link to='#' className="linktoprofile" >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>

                                <hr />
                                {
                                    comp
                                }
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </>)
}