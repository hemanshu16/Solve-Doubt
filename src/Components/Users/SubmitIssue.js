import React from "react";

export default function SubmitIssue(props)
{
    const [login, setLogin] = React.useState(false);
    const [question, setquestion] = React.useState({
         title : "",
         description : ""
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
         setquestion(oldDetails => {       
             return {...oldDetails, [e.target.name] : e.target.value}
         })
    }
    function handleData()
    {    alert(question.title + question.description)
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
       setquestion({title : "", description :""})
    }
    return (
        <>
        {login && <>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row d-flex align-items-center">
                    
                    
                    
                    <div className="d-flex flex-column align-items-center ">
                        <div className="col-md-7 border-right">
                            <div className="">
                                <div className="d-flex justify-content-between align-items-left mb-3 mt-2">
                                    <h4 className="text-right">Submit Issue</h4>
                                </div>
                               
                                <div className="row">
                                    <div className="col-md-12"><label className="labels">Title</label><input type="text" name="title" onChange={handleChange} className="form-control" placeholder="Question Title" value={question.title} /></div>
                                    <div className="col-md-12"><label className="labels">Description</label><textarea  name="description" className="form-control" onChange={handleChange}  placeholder="Description" value={question.description} /></div>
                                </div>
                                <br/>
                                <div className="text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleData}>Submit Issue</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>}
    </>
    )
}