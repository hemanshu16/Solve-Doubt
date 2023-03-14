import React, { useState } from 'react'

export default function Signin(props) {

    const [formdata, setFormdata] = useState({email : "", password:""})
    function handledata(e)
    {
        setFormdata(old => {
            return {...old, [e.target.name] : e.target.value}
        })
    }
    async function get_username()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "jwt": localStorage.getItem('jwt')
           }
           
           let response = await fetch("https://localhost:7295/api/Users/UserName", { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           console.log(data)
           localStorage.setItem('name',data.name);
           localStorage.setItem('id',data.id);
    }
    async function validate()
    {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "crossorigin": "true",    
           }
           
           let bodyContent = JSON.stringify(
             formdata
           );
           
           let response = await fetch("https://localhost:7295/api/Users/Login", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           alert(data)
           if(data == "UserName or Password is Wrong")
           {
            alert("UserName or Password is Wrong");
           }
           else{
           localStorage.setItem("jwt",data);
           await get_username();
           props.setLogin(true)
           }
           
    }
  return (
    <section className="py-5">
    <div className="container py-5">
        <div className="row mb-4 mb-lg-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <p className="fw-bold text-success mb-2">Login</p>
                <h2 className="fw-bold">Welcome back</h2>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card">
                    <div className="card-body text-center d-flex flex-column align-items-center">
                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                            </svg></div>
                        <form >
                            <div className="mb-3"><input className="form-control" type="email" name="email" onChange={handledata} value={formdata.email} placeholder="Email" /></div>
                            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={handledata} value={formdata.password}
                             /></div>
                            <div className="mb-3">
                                <button className="btn btn-primary shadow d-block w-100" type='button' onClick={validate}>Log in</button></div>
                            <p className="text-muted">Forgot your password?</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
