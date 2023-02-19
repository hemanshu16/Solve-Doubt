import React, {useState, useEffect} from "react";
import "./Users/generalquestions.css";
import Action from "./Action";

export default function ViewIssues(props) {

    const [app, setApp] = useState([]);

    async function getdata() {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }

        let response = await fetch(`http://localhost:5000/api/application/all`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.text();
        data = JSON.parse(data)
        console.log(data)
        setApp(data.applications)
    }
    useEffect(() => {
        getdata();
    }, [])
    // function handleaction(e,str,role,id)
    // {
    //     let action = setAction(str,role,e.target.value)
    //     let apps = []
    //     setApp(oldapps => {
    //         for(let i=0;i<oldapps.length;i++)
    //         {
    //             if(oldapps[i]._id === id)
    //             {   
    //                 oldapps[i].action = action
    //             }
    //             apps.push(oldapps[i])
    //         }
    //         return apps;
    //     })
    // }
    // function handlestatus(e,id)
    // {   let apps = []
    //     setApp(oldapps => {
    //         for(let i=0;i<oldapps.length;i++)
    //         {
    //             if(oldapps[i]._id === id)
    //             {   
    //                 oldapps[i].status = e.target.value
    //             }
    //             apps.push(oldapps[i])
    //         }
    //         return apps;
    //     })
    // }
    

    let role = localStorage.getItem('role')
    const comp = app.map((ap) => {
         <Action props={ap} />
       
    })
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
                                {comp}
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
        </>
    )
}