import React from "react";

export default function Issue(props)
{
    return (
        <div className="col-8 mt-4">
        <div className="card" >
            <div className="card-body">
                <div className="row">
                <div className="col-8">
                <h5 className="card-title">{props.title}</h5>
                </div>
                <div className="col-4">
                    <div className="row">
                            <p>{props.date}</p>
                    </div>
                    <div className="row">
                            <p>{props.username}</p>
                    </div>
                </div>
                </div>
                <p className="card-text">{props.description}</p> <h5 className="card-subtitle mb-2 text-muted">Status</h5>
                <hr/>
                <div className="row">
                    
                    
                    <p>Action Taken</p>
                    <textarea className="actionupdate"  placeholder="wirte your action here" value={props.vc.action}></textarea>
                    
                    <p>Status</p>
                    <input type="text" className="actionupdate" placeholder="write your status here" value={props.vc.status}/>
               
                </div>
                <hr />
                <div className="row">
                    <p>By Mamlatdar
                    </p>
                    <p>Action Taken</p>
                    <textarea className="actionupdate"  placeholder="wirte your action here" ></textarea>
                    
                    <p>Status</p>
                    <input type="text" className="actionupdate" placeholder="write your status here"/>
                </div>
                <hr />
                <div className="row">
                    <p>By Collector
                    </p>
                    <p>Action Taken</p>
                    <textarea className="actionupdate"  placeholder="wirte your action here" ></textarea>
                    
                    <p>Status</p>
                    <input type="text" className="actionupdate" placeholder="write your status here"/>
               
                </div>
            </div>
        </div>
    </div>
    )
}