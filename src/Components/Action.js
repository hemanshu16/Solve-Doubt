import React from "react";
import { getAction, setAction } from "./utility";

export default function Action(props)
{   const[action, setAction] = React.useState(props.props)
    function handleaction(e)
    {   

        let action = e.target.value
        if(e.target.name === "action")
        action = setAction(action.action,action.role,e.target.value)
        setAction(old => {
            return {...old, [e.target.name] : action}
        })
    }
    return (
       
            <><div className="row">
                <div className="col-8">
                    <h5 className="card-title">{ap.title}</h5>
                </div>
                <div className="col-4">
                    <div className="row">
                        <p>Date : {new Date(ap.date).toDateString()}</p>
                    </div>
                </div>
            </div>
                <p className="card-text">{ap.description}</p>
                <h5 className="card-subtitle mb-2 text-muted">Status</h5>
                <input type="text" className="actionupdate" name="status" value={ap.status} onChange={handlestatus} placeholder="write your status here" />
                <hr />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <p>By VC</p>
                            </div>
                            { role === 'vc' &&
                            <div className="col-4">
                                <button className="btn btn-primary profile-button" type="button" >Forward to Mamlatdar</button>
                            </div>
                            }
                        </div>
                    </div>
                    <p>Action Taken</p>
                    <textarea className="actionupdate" name="vc" onChange={handleaction}  placeholder="wirte your action here" value={getAction(ap.action, role)}></textarea>
                    {role == 'vc'&&
                  <button className="btn btn-primary savechagesbutton" type="button" >Save Changes</button>
                        }
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <p>By Mamlatdar</p>
                            </div>
                            { role == 'mm' &&
                            <div className="col-4">
                                <button className="btn btn-primary profile-button" type="button" >Forward to Collector</button>
                            </div>
    }
                        </div>
                    </div>
                    <p>Action Taken</p>
                    <textarea className="actionupdate" name="mm" onChange={handleaction} placeholder="wirte your action here" value={getAction(ap.action, 'mm')} ></textarea>
                    {role == 'mm' &&
                    <button className="btn btn-primary savechagesbutton" type="button" >Save Changes</button>
                }
                </div>
                <hr />
                <div className="row">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-8">
                                    <p>By Collector</p>
                                </div>
                               
                            </div>
                        </div>
                        <p>Action Taken</p>
                        <textarea className="actionupdate" name="cl" onChange={handleaction} placeholder="wirte your action here" value={getAction(ap.action, 'cl')} ></textarea>
                        {role == 'cl'&&
                        <button className="btn btn-primary savechagesbutton " type="button" >Save Changes</button>
                        } 
                    </div>
                </div>

            <hr/>
            <hr/>
            </>)
    
}