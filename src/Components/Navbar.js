import React from "react";
import { Link, useParams } from 'react-router-dom';

export default function Navbar(props) {
  const [registration, setRegistration] = React.useState(false);
  const [error, setError] = React.useState({ iserror: false, error: "" });
  const [rerror, setrError] = React.useState({ iserror: false, error: "" });
  const [userdetails, setUserDetails] = React.useState({
    name : {firstname : ""},
    role : ""
  });
  const [login, setLogin] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formData1, setFormData1] = React.useState({
    contact: "",
    email: "",
    password: "",
  });


  React.useEffect(() => {
    const value = localStorage.getItem("islogged");
    if (localStorage.getItem("name") !== undefined) {
     // setUserDetails(localStorage.getItem("name"));
    }
    if (value !== undefined && value === "1") {
        setLogin(true);
        setUserDetails({"role" : localStorage.getItem("role"),"name" : {"firstname" : localStorage.getItem("name")}})
        // alert("Done")
    }
  }, [props]);
   
 
  
  function handleChange(e) {
    setFormData((oldvalue) => {
      return {
        ...oldvalue,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleChange1(e) {
    console.log(e.target.value);
    setFormData1((oldvalue) => {
      return {
        ...oldvalue,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleData() {
    console.log(formData);
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }, 

      body: JSON.stringify(formData),
    });
    response.json().then((data) => {
      if (data.error != null) {
        setError({ iserror: true, error: data.error });
      } else {
        
        // props.setLogin(true);
        setLogin(true)
        localStorage.setItem("islogged", "1");
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("role",data.user.role);
        localStorage.setItem("name",data.user.name.firstname);
        localStorage.setItem("userid",data.user._id)
        if(data.user.name.firstname === "firstname")
        {
          data.user.name.firstname = ""
        }
        setUserDetails(data.user)
        setError({ iserror: false, error: "" });
        setrError({ iserror: false, error: "" });
      }
    })
    // localStorage.setItem("islogged", "1");
    // setLogin(true)
  }
  async function handleData1() {
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData1),
    });
    console.log(response)
    response.json().then((data) => {
      if (data.message != undefined || data.message != null) {
        setrError({ iserror: true, error: data.message });
      } else {
        setRegistration(true);
      }
    })
   
  }
  function logout(event) {
    event.preventDefault();
    localStorage.clear("islogged");
    setLogin(false);
    localStorage.clear();
    setRegistration(false);
    setFormData({ email: "", password: "" });
    setFormData1({ name: "", email: "", password: "" });
    setError({ iserror: false, error: "" });
        setrError({ iserror: false, error: "" });
  }

  
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid navContainer ">
        
          <img src="./logo512.png" className="Headingimg" alt="imgae not found" />
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navul">
                {login && userdetails.role === "enduser" && <>
                <li className="nav-item navliunderline">
                <Link to='/User/GeneralQuestions' className="nav-link" >
                    General Questions
                  </Link>
                </li>
                <li className="nav-item navliunderline">
                <Link to='/User/SubmitIssue' className="nav-link" >
                    Submit Issue
                  </Link>
                </li>
                <li className="nav-item navliunderline">
                <Link to='/User/ViewIssues' className="nav-link" >
                    View Issues (Own)
                  </Link>
                </li>
                <li className="nav-item navliunderline">
                <Link to='/User' className="nav-link" >
                    Profile
                  </Link>
                </li>
                </>
                }
                 {login && userdetails.role =="vc" && <>
                <li className="nav-item navliunderline">
                <Link to='/VC/VerifyUser' className="nav-link" >
                    Verifaction rquests
                  </Link>
                </li>
                <li className="nav-item navliunderline">
                <Link to='/VC/ViewIssues' className="nav-link" >
                    View Issues
                  </Link>
                </li>
                
                <li className="nav-item navliunderline">
                <Link to='/VC' className="nav-link" >
                    Profile
                  </Link>
                </li>
                </>}
                {login && userdetails.role =="mm" && <>
                <li className="nav-item navliunderline">
                <Link to='/Mamlatdar/ViewIssues' className="nav-link" >
                    View Issues
                  </Link>
                </li>
                
                <li className="nav-item navliunderline">
                <Link to='/Mamlatdar' className="nav-link" >
                    Profile
                  </Link>
                </li>
                </>}
                {login && userdetails.role =="cl" && <>
                
                <li className="nav-item navliunderline">
                <Link to='/Collector/ViewIssues' className="nav-link" >
                    View Issues
                  </Link>
                </li>
                
                <li className="nav-item navliunderline">
                <Link to='/Collector' className="nav-link" >
                    Profile
                  </Link>
                </li>
                </>}
           
          </ul>
         
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            {!login && (
              <>
                <li className="nav-item">
                  <a
                    className="btn btn-outline-success navleft navTop"
                    href="abc"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="btn btn-outline-success"
                    href="abc"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                  >
                    Register
                  </a>
                </li>
              </>
            )}
            {login && (
              <>
                
                <p >Welcome {userdetails.name.firstname} </p> &nbsp; &nbsp; 
                <a
                  className="btn btn-outline-success"
                  href="abc"
                  onClick={logout}
                >
                  Logout
                </a>
              </>
            )}
          </ul>
        </div>
      </div>
    
     
    </nav>
     <div
     className="modal fade"
     id="exampleModal"
     tabindex="-1"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
   >
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header text-center">
           <h4 className="modal-title w-100 font-weight-bold">Login</h4>
           <button type="button" className="close" data-bs-dismiss="modal">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         {!login && (
           <div className="login--body">
             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="email"
                 onChange={handleChange}
                 placeholder="Email Address"
                 value={formData.name}
               />
             </div>
             <div className="input--class">
               <input
                 type="password"
                 className="input--login"
                 name="password"
                 onChange={handleChange}
                 placeholder="Password"
                 value={formData.password}
               />
             </div>
             {error.iserror && (
               <h2 className="model--body--message"> {error.error} </h2>
             )}
           </div>
         )}
         {login && (
           <h3 className="model--body--message">Successfully Login</h3>
         )}
         <div className="modal-footer d-flex justify-content-center">
           {!login && (
             <button
               type="button"
               className="btn btn-info"
               onClick={handleData}
             >
               Submit
             </button>
           )}
           {login && (
             <button type="button" className="close" data-bs-dismiss="modal">
               close
             </button>
           )}
         </div>
       </div>
     </div>
   </div>

   <div
     className="modal fade"
     id="exampleModal1"
     tabindex="-1"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
   >
     <div className="modal-dialog modal-dialog-centered">
       <div className="modal-content">
         <div className="modal-header text-center">
           <h4 className="modal-title w-100 font-weight-bold">Registration</h4>
           <button type="button" className="close" data-bs-dismiss="modal">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         {!registration && (
           <div className="login--body">
           

             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="email"
                 onChange={handleChange1}
                 placeholder="Email Address"
                 value={formData1.email}
               />
             </div>
             <div className="input--class">
               <input
                 type="text"
                 className="input--login"
                 name="contact"
                 onChange={handleChange1}
                 placeholder="Contact Number"
                 value={formData1.contact}
               />
             </div>
             <div className="input--class">
               <input
                 type="password"
                 className="input--login"
                 name="password"
                 onChange={handleChange1}
                 placeholder="Password"
                 value={formData1.password}
               />
             </div>
             {rerror.iserror && (
               <h2 className="model--body--message"> {rerror.error} </h2>
             )}
           </div>
         )}
         {registration && (
           <h3 className="model--body--message">
             Successfully Registration done
           </h3>
         )}
         <div className="modal-footer d-flex justify-content-center">
           {!registration && (
             <button
               type="button"
               className="btn btn-info"
               onClick={handleData1}
             >
               Submit
             </button>
           )}
           {registration && (
             <button type="button" className="close" data-bs-dismiss="modal">
               close
             </button>
           )}
         </div>
       </div>
     </div>
   </div>
   </>
  );
}