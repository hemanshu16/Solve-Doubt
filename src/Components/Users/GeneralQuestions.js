import React from "react";
import "./generalquestions.css";

export default function GeneralQuestions(props) {
    const [issue, setIssue] = React.useState([])

   

    
    React.useEffect(() => {
        const value = localStorage.getItem("islogged");
        if (localStorage.getItem("name") !== undefined) {
            
        }
        if (value !== undefined && value === "1") {

        }
       
    }, [props]);

    return (
        <>
            <div className="container">
                <div className="row d-flex flex-column align-items-center">

                    <div className="col-4 mt-4">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Sort The Issues</option>
                            <option value="1">By Solved</option>
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
                                    <div className="col-8">
                                        <h5 className="card-title">Card title</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="row">
                                            <p>Date</p>
                                        </div>
                                        <div className="row">
                                            <p>By User name</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <h5 className="card-subtitle mb-2 text-muted">Status</h5>
                                <hr />
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-8">
                                                <p>By VC</p>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-primary profile-button" type="button" >Forward to Mamlatdar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" placeholder="wirte your action here" ></textarea>

                                    <p>Status</p>
                                    <input type="text" className="actionupdate" placeholder="write your status here" />
                                    <button className="btn btn-primary savechagesbutton" type="button" >Save Changes</button>

                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-8">
                                                <p>By Mamlatdar</p>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-primary profile-button" type="button" >Forward to Collector</button>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" placeholder="wirte your action here" ></textarea>

                                    <p>Status</p>
                                    <input type="text" className="actionupdate" placeholder="write your status here" />
                                    <button className="btn btn-primary savechagesbutton" type="button" >Save Changes</button>

                                </div>
                                <hr />
                                <div className="row">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-8">
                                                <p>By Collector</p>
                                            </div>
                                            <div className="col-4">
                                                {/* <button className="btn btn-primary profile-button" type="button" >Forward to Mamlatdar</button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" placeholder="wirte your action here" ></textarea>

                                    <p>Status</p>
                                    <input type="text" className="actionupdate" placeholder="write your status here" />
                                    <button className="btn btn-primary savechagesbutton " type="button" >Save Changes</button>

                                </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                
            </div>
        </>
    )
}