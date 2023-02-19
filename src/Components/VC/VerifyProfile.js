import React from "react";
import "./VerifyProfile.css";
import { Link, useParams } from 'react-router-dom';

export default function VerifyProfile(props) {
    const { ProfileId } = useParams();
    let login = true
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
        "approved" : "",
        "reason" : ""
    });

    

    async function  getuserdetails ()
    {      let jwt = localStorage.getItem('jwt')
           let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
               }
               let response = await fetch("http://localhost:5000/api/user/" + ProfileId, { 
                 method: "GET",
                 headers: headersList
               });
               
               let data = await response.text();
               let user = JSON.parse(data).user;
               if(user !== undefined && user !== null)
                {setUserDetails(user) 
                    setStatus({approved : user.approved, reason : user.reason})
                console.log(user)}
    }
    React.useEffect(() => {
        const value = localStorage.getItem("islogged");
            getuserdetails();
    }, [props]);


    function handleChange(e)
    {   
       

       
    }
    async function handleData()
    {
        console.log(status)
        let uid = localStorage.getItem('userid')
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
           }
           
           let bodyContent = JSON.stringify(
            {
                "approved": status.approved,
                "reason": status.reason
            }
           );
           
           let response = await fetch("http://localhost:5000/api/user/approveuser/" + uid, { 
             method: "PUT",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data);
           
           
    }
    function handleData1(e)
    {
        setStatus(old => {
            return {...old,[e.target.name]:e.target.value}
        })
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
                                <select className="form-select statusselect" name="approved" value={status.approved} onChange={handleData1} aria-label="Default select example">
                            <option selected>Status</option>
                            <option value="Verified">Verified</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <br/>
                        <input type="text" name="reason" className="form-control" value={status.reason} placeholder="Reason" onChange={handleData1} ></input>
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
                                        <div className="col-md-12"><label className="labels">Pincode</label><input type="number" name="pincode" className="form-control"  placeholder="Pincode" value={userdetails.address.pincode} /></div>
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