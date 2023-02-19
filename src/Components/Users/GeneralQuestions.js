import "./generalquestions.css";
import React, { useEffect, useState } from "react";
import { getAction } from '../utility'

export default function GeneralQuestions(props) {

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

    const comp = app.map((ap) => {
        return (
            <div className="col-8 mt-4" key={ap._id}>
                <div className="card" >
                    <div className="card-body">
                        <div className="row">
                            <div className="col-8">
                                <h5 className="card-title">{ap.title}</h5>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <p>{new Date(ap.date).toDateString()}</p>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">{ap.description}</p>
                        <h5 className="card-subtitle mb-2 text-muted">Status</h5>

                        <input type="text" className="actionupdate" disabled value={ap.status} />
                        <hr />
                        <div className="row">
                            <p>Action Taken By VC
                            </p>
                            <p className="actionupdate" disabled placeholder="wirte your action here">{getAction(ap.action, "vc")}</p>



                        </div>
                        <hr />
                        <div className="row">
                        <p>Action Taken By Mamlatdar
                            </p>
                            <p className="actionupdate" disabled placeholder="wirte your action here">{getAction(ap.action, "mm")}</p>

                        </div>
                        <hr />
                        <div className="row">
                        <p>Action Taken By Collector
                            </p>
                            <p className="actionupdate" disabled placeholder="wirte your action here">{getAction(ap.action, "collector")}</p>


                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row d-flex flex-column align-items-center ">
                {comp}
            </div>

        </div>
    );
}