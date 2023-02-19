import React, { useEffect, useState } from "react";
import {getAction} from '../utility'

export default  function ViewIssuesOwn(props) {
    
    const [app, setApp] = useState([{
        
            "_id": "63f0e462a6a0f4a01b6d950a",
            "user": "63f0e434a6a0f4a01b6d9503",
            "title": "New App Title - after session 3",
            "description": "by sahil nandaniya",
            "town": "kalavad",
            "district": "jamnagar",
            "pincode": 361160,
            "date": "2023-02-01T14:32:52.099Z",
            "action": "None",
            "forwarded": "cl",
            "__v": 0,
            "status": "Pending"
          
    }]);
    
    async function  getdata() {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
       }
       
    //    let userid = localStorage.getItem('userid')
       let userid = "63f0e434a6a0f4a01b6d9503"
       let response = await fetch(`http://localhost:5000/api/application/${userid}`, { 
         method: "GET",
         headers: headersList
       });
        
       let data = await response.text();
       data = JSON.parse(data)
       console.log(data)
       setApp(data.application)  
    }
    useEffect(()=>{
     //  getdata();
    },[])
    
    const comp = app.map((ap) => {
        <div className="col-8 mt-4">
            <div className="card" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h5 className="card-title">{ap.title}</h5>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <p>{ap.date}</p>
                            </div>
                        </div>
                    </div>
                    <p className="card-text">{ap.description}</p>
                    <h5 className="card-subtitle mb-2 text-muted">Status</h5>
                    <hr />
                    <div className="row">
                        <p>By VC
                        </p>
                        <p>Action Taken</p>
                        {/* <textarea className="actionupdate" disabled placeholder="wirte your action here" >${getAction(app.action, "vc")}</textarea> */}

                        <p>Status</p>
                        <input type="text" className="actionupdate" disabled placeholder="write your status here" />

                    </div>
                    <hr />
                    <div className="row">
                        <p>By Mamlatdar
                        </p>
                        <p>Action Taken</p>
                        <textarea className="actionupdate" disabled placeholder="wirte your action here" ></textarea>

                        <p>Status</p>
                        <input type="text" className="actionupdate" disabled placeholder="write your status here" />
                    </div>
                    <hr />
                    <div className="row">
                        <p>By Collector
                        </p>
                        <p>Action Taken</p>
                        <textarea className="actionupdate" disabled placeholder="wirte your action here" ></textarea>

                        <p>Status</p>
                        <input type="text" className="actionupdate" disabled placeholder="write your status here" />

                    </div>
                </div>
            </div>
        </div>
        })

    return (
        <div className="container">
            <div className="row d-flex flex-column align-items-center ">
                { comp }
            </div>
            
        </div>
    );
}