import React from "react";
import { Link, useParams } from 'react-router-dom';


export default function Navbar(props) {
  const name = localStorage.getItem('name')
  React.useEffect(()=>{
     if(localStorage.getItem('jwt') != undefined)
     {
      props.setLogin(true)
     }
  })
  function LogOut()
  {
    localStorage.clear();
    props.setLogin(false);
  }
  return (
    <nav className="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav">
    <div className="container"><a className="navbar-brand d-flex align-items-center" href="/">
      <span>
        <img src="/logo.png" height="50px" alt="logo" />
        </span></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item"><Link className="nav-link" to="../">Home</Link></li>
                <li className="nav-item"><Link className="nav-link"to="User/UpdateQuestion">Write Question</Link></li>
                <li className="nav-item"><Link className="nav-link" to="User/ViewQuestions">View Questions</Link></li>
            </ul>
            {props.login_status &&  <><h4> Welcome {name}</h4> &nbsp; &nbsp;
            <a className="btn btn-outline-primary shadow " role="button" onClick={LogOut}>Log Out</a></>
            }
            {!props.login_status && <>
            <Link className="btn btn-primary shadow" role="button" to="Singin">Sign In</Link> &nbsp; &nbsp;
            <Link className="btn btn-primary shadow" role="button" to="SingUp">Sign Up</Link></>
            }
        </div>
    </div>
</nav>
  )
}
