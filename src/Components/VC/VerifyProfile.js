import React from "react";
import "./VerifyProfile.css";
import { Link, useParams } from 'react-router-dom';

export default function VerifyProfile(props) {
    const { ProfileId } = useParams();
    
    const [login, setLogin] = React.useState(false);
    const [userdetails, setUserDetails] = React.useState({
        name:{
            firstname: "",
            middlename: "",
            lastname: ""
        },
        email:"",
        password: "",
        contact: "",
        aadhaarcard_no: "",
        address:{
            home:"",
            village: "",
            town: "",
            district: "",
            pincode: ""
        },
    });
    const[status , setStatus] = React.useState({
        "status" : "",
        "reason" : ""
    });
    React.useEffect(() => {
        const value = localStorage.getItem("islogged");
        if (localStorage.getItem("name") !== undefined) {
            // setUserDetails(localStorage.getItem("name"));
        }
        if (value !== undefined && value === "1") {
            setLogin(1);
        }
    }, [props]);
    function handleChange(e)
    {   
       

        //  setUserDetails(oldDetails => {
        //     console.log(userdetails)
        //     if(e.target.name === "firstname" || e.target.name === "lastname" || e.target.name === "middlename")
        //     {
        //         let name = {...oldDetails.name , [e.target.name] : e.target.value}
        //         return {...oldDetails , name : name}
        //     }
        //     if(e.target.name === "home" || e.target.name === "town" || e.target.name === "village" || e.target.name === "district" || e.target.name === "pincode")
        //     {
        //         let name = {...oldDetails.address , [e.target.name] : e.target.value}
        //         return {...oldDetails , address : name}
        //     }
        //      return {...oldDetails, [e.target.name] : e.target.value}
            
        //  })
    }
    function handleData()
    {
         // const response = await fetch("http://localhost:8080/Login", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify(formData),
    // });
    // response.json().then((data) => {
    //   if (data.error != null) {
    //     setError({ iserror: true, error: data.error });
    //   } else {
        
    //     props.setLogin(true);
    //     localStorage.setItem("islogged", "1");
    //     localStorage.setItem("name", data.user);
    //     localStorage.setItem("jwt", data.token);
    //     setName(data.user);
    //     setError({ iserror: false, error: "" });
    //     setrError({ iserror: false, error: "" });
    //   }
    // })
    }
    return (
        <>
            {login && <>
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center ">
                                <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Not Found" />
                                <span className="font-weight-bold">Edogaru</span>
                                <span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
                        
                        </div>
                        <div className="col-md-4 border-right mt-5">
                            <div className=" align-items-center text-center ">
                            <div className="card" style={{"width": "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Profile Verifcation</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                                <select className="form-select statusselect" aria-label="Default select example">
                            <option selected>Status</option>
                            <option value="1">Solved</option>
                            <option value="2">Pending</option>
                            <option value="3">Not Resolved</option>
                            <option value="4">Rejected</option>
                        </select>
                        <br/>
                        <input type="text"  className="form-control" placeholder="Reason" name="reason" ></input>
                        <br/>
                                 <button className="savechages"  onClick={handleData}>Save Status</button>
                            </div>
                            </div>
                        </div>
                    </div>
                        <div className="d-flex flex-column align-items-center ">
                            <div className="col-md-7 border-right">
                                <div className="">
                                    <div className="d-flex justify-content-between align-items-left mb-3 mt-2">
                                        <h4 className="text-right">Profile Details</h4>
                                    </div>
                                    <div className="row ">
                                        <div className="col-md-4 "><label className="labels">First Name</label><input type="text" name="firstname" className="form-control"  onChange={handleChange} placeholder="first name" value={userdetails.name.firstname}  /></div>
                                        <div className="col-md-4 "><label className="labels">Middle Name</label><input type="text" name="middlename" className="form-control" onChange={handleChange} placeholder="surname" value={userdetails.name.middlename}/></div>
                                        <div className="col-md-4 "><label className="labels">Surname</label><input type="text" name="lastname" className="form-control"  onChange={handleChange} value={userdetails.name.lastname} placeholder="surname" /></div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"><label className="labels">Email Address</label><input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Email Address" value={userdetails.email} /></div>
                                        <div className="col-md-12"><label className="labels">Mobile No</label><input type="number" name="contact" className="form-control" onChange={handleChange}  placeholder="Mobile Number" value={userdetails.contact} /></div>
                                        <div className="col-md-12"><label className="labels">AadharCard Number</label><input type="nubmer" name="aadhaarcard_no"  onChange={handleChange} className="form-control" placeholder="AdharCard Number" value={userdetails.aadhaarcard_no} /></div>
                                        <div className="col-md-12"><label className="labels">Home No/Name</label><input type="text" name="home" className="form-control" onChange={handleChange} placeholder="Home No/Name" value={userdetails.address.home} /></div>
                                        <div className="col-md-12"><label className="labels">Village</label><input type="text" name="village" className="form-control" onChange={handleChange} placeholder="Village" value={userdetails.address.village} /></div>
                                        <div className="col-md-12"><label className="labels">Town</label><input type="text" name="town" className="form-control" onChange={handleChange} placeholder="Town" value={userdetails.address.town} /></div>
                                        <div className="col-md-12"><label className="labels">District</label><input type="text" name="district" className="form-control" onChange={handleChange} placeholder="District" value={userdetails.address.district} /></div>
                                        <div className="col-md-12"><label className="labels">Pincode</label><input type="number" name="pincode" className="form-control" onChange={handleChange} placeholder="Pincode" value={userdetails.address.pincode} /></div>
                                    </div>
                                    <br/>
                                                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    );
}