import React from "react";

import { Link, useParams } from 'react-router-dom';
// import "../Users/generalquestions.css";

export default function VerifyRequests(props) {
    const [issue, setIssue] = React.useState([])

    function handleIssue(e, id) {
        setIssue(oldDetails => {
            for (let i = 0; i < oldDetails.length; i++) {
                if (oldDetails[i].id === id) {
                    oldDetails[i] = { ...oldDetails[i], [e.target.value]: e.target.value }
                }
            }
            return oldDetails
        })

    }
    React.useEffect(() => {
        const value = localStorage.getItem("islogged");
        if (localStorage.getItem("name") !== undefined) {
            // setUserDetails(localStorage.getItem("name"));
        }
        if (value !== undefined && value === "1") {

        }
        setIssue([
            { id: "4", title: "hello", description: "okay good" },
            { id: "5", title: "hello 5", description: "okay good 5" },
            { id: "6", title: "hello 6", description: "okay good 6" },
        ])
    }, [props]);

return(
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
                            <div className="col-6">
                                <h5 className="card-title">User Name</h5>
                            </div>
                            <div className="col-3">
                                <p className="card-title">Date</p>
                            </div>
                            <div className="col-3">
                <Link to='/VC/VerifyProfile/123userid' className="linktoprofile" >
                    View Profile
                  </Link>
                            </div>
                        </div>
                    
                        <hr />
                      
                    </div>
                </div>
            </div>


        </div>
        <div className="position-fixed bottom-0 end-0 p-3" >
            <div id="liveToast" className={true ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">

                    <strong className="me-auto"> good morning</strong>

                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>

            </div>
        </div>
    </div>
</>)
    }