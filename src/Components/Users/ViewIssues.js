import React from "react";

export default function ViewIssuesOwn(props)
{
    return(
        <div className="container">
                <div className="row d-flex flex-column align-items-center ">
                <div className="col-8 mt-4">
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
                                <hr/>
                                <div className="row">
                                    <p>By VC
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" disabled placeholder="wirte your action here" ></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" disabled placeholder="write your status here"/>
                               
                                </div>
                                <hr />
                                <div className="row">
                                    <p>By Mamlatdar
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" disabled placeholder="wirte your action here" ></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" disabled placeholder="write your status here"/>
                                </div>
                                <hr />
                                <div className="row">
                                    <p>By Collector
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" disabled  placeholder="wirte your action here" ></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" disabled placeholder="write your status here"/>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mt-4">
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
                                <hr/>
                                <div className="row">
                                    <p>By VC
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate"  placeholder="wirte your action here" disabled></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" placeholder="write your status here" disabled/>
                               
                                </div>
                                <hr />
                                <div className="row">
                                    <p>By Mamlatdar
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate"  placeholder="wirte your action here" disabled ></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" placeholder="write your status here" disabled/>
                                </div>
                                <hr />
                                <div className="row">
                                    <p>By Collector
                                    </p>
                                    <p>Action Taken</p>
                                    <textarea className="actionupdate" disabled placeholder="wirte your action here" ></textarea>
                                    
                                    <p>Status</p>
                                    <input type="text" className="actionupdate" disabled placeholder="write your status here"/>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    );
}