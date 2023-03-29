import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function Singup() {
    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({ name: "", email: "", password: "" })
    function handledata(e) {
        setFormdata(old => {
            return { ...old, [e.target.name]: e.target.value }
        })
    }
    const [message, setMessage] = useState({
        message: "",
        visible: false
    })
    function closeToast() {
        setMessage({ message: "", visible: false });
    }
    async function validate() {
        let headersList = {
            "Accept": "*/*",
            "password": formdata.password,
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": formdata.email,
            "name": formdata.name
        });

        let response = await fetch("https://localhost:7295/api/Users/Register", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        if (data == -1) {
            setMessage({ message: "Email is already Exist", visible: true })
        }
        else {
            navigate("/singin")
        }

    }
    return (
        <section className="py-5">
            <div className="container py-5">
                <div className="row mb-4 mb-lg-5">
                    <div className="col-md-8 col-xl-6 text-center mx-auto">
                        <p className="fw-bold text-success mb-2">Sing Up</p>
                        <h2 className="fw-bold">Welcome </h2>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 col-xl-4">
                        <div className="card">
                            <div className="card-body text-center d-flex flex-column align-items-center">
                                <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                </svg></div>
                                <form method="post">
                                    <div className="mb-3"><input className="form-control" type="text" name="name" placeholder="Your Name" value={formdata.name} onChange={handledata} /></div>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" onChange={handledata} value={formdata.email} placeholder="Email" /></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={handledata} value={formdata.password} /></div>

                                    <div className="mb-3"><button className="btn btn-primary shadow d-block w-100" onClick={validate} type="button">Submit</button></div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3" >
                <div id="liveToast" className={message.visible ? "toast show" : "toast hide"} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            <strong className="me-auto"> {message.visible && message.message}</strong>
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" onClick={closeToast} aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </section>
    )
}
