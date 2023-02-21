import React from "react";
import { getAction, setAction } from "./utility";

export default function Action(props)
{   const[ap, setAction1] = React.useState(props.props.ap)
    const role = props.props.role
    
    function handleaction(e)
    {   
        // console.log(ap)
        let action = e.target.value
        if(e.target.name === "action")
        { action = setAction(ap.action,role,e.target.value) }
        setAction1(old => {
            return {...old, [e.target.name] : action}
        })
        console.log(ap)
    }
    function handleforward(e)
    {   let uprole = 'mm'
        if(role == 'mm')
        {
            uprole = 'cl'
        }
        setAction1(old => {
            return {...old,"forwarded":uprole}
        })
        handleData()
    }
    async function handleData()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMwY2FlMGYzNDk1M2E3YjBhNmQ4YjRlIn0sImlhdCI6MTY2MjcyNjk2Mn0.tNFzto7elVHHgAhLbzXEuunua4KuRbdQs0fm76XzfSE",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
           }
           
           let bodyContent = JSON.stringify(ap);
           
           let response = await fetch("http://localhost:5000/api/application/update/" + ap._id, { 
             method: "PUT",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data);
           
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
                <input type="text" className="actionupdate" name="status" value={ap.status} onChange={handleaction} placeholder="write your status here" />
                <hr />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <p>By VC</p>
                            </div>
                            { role === 'vc' && ap.forwarded === 'vc' &&
                            <div className="col-4">
                                <button className="btn btn-primary profile-button" type="button" onClick={handleforward}>Forward to Mamlatdar</button>
                            </div>
                            }
                        </div>
                    </div>
                    <p>Action Taken</p>
                    <textarea className="actionupdate" name="action" onChange={handleaction}  placeholder="wirte your action here" value={getAction(ap.action, 'vc')}></textarea>
                    {role == 'vc'&&
                  <button className="btn btn-primary savechagesbutton" type="button" onClick={handleData}>Save Changes</button>
                        }
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-8">
                                <p>By Mamlatdar</p>
                            </div>
                            { role == 'mm' && ap.forwarded === 'mm' &&
                            <div className="col-4">
                                <button className="btn btn-primary profile-button" type="button" onClick={handleforward} >Forward to Collector</button>
                            </div>
    }
                        </div>
                    </div>
                    <p>Action Taken</p>
                    <textarea className="actionupdate" name="action" onChange={handleaction} placeholder="wirte your action here" value={getAction(ap.action, 'mm')} ></textarea>
                    {role == 'mm' &&
                    <button className="btn btn-primary savechagesbutton" type="button" onClick={handleData} >Save Changes</button>
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
                        <textarea className="actionupdate" name="action" onChange={handleaction} placeholder="wirte your action here" value={getAction(ap.action, 'cl')} ></textarea>
                        {role == 'cl'&& ap.forwarded === 'cl' &&
                        <button className="btn btn-primary savechagesbutton " type="button" onClick={handleData} >Save Changes</button>
                        } 
                    </div>
                </div>

            <hr/>
            <hr/>
            </>)
    
}