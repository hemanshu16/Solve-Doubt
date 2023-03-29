import React from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

export default function ViewQuestions() {
    const [questions,setQuestions] = React.useState([])
    const [pagenumber,setPageNumber] = React.useState(1)
    const[message, setMessage] = React.useState({
        message : "",
        visible : false
    })
    function closeToast() {
        setMessage({ message: "", visible: false });
    }
    async function getQuestions(pagenumber)
    {
        pagenumber = pagenumber - 1;
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "jwt": localStorage.getItem('jwt')
           }
           
           let response = await fetch("https://localhost:7295/api/Questions/GetQuestions?pagenumber=" + pagenumber, { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data);
           setQuestions(data)
           
    }
    async function deletequestion(id)
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "jwt": localStorage.getItem('jwt'),
            "id" : id
           }
           
           let response = await fetch("https://localhost:7295/api/Questions/" + id, { 
             method: "DELETE",
             headers: headersList
           });
           
           let data = await response.text();
           
           if(response.status == 204)
           {
            setQuestions(old => {
                let new_ = []
                for(let i=0;i<old.length; i++)
                {
                    if(old[i].id != id)
                    {
                        new_.push(old[i]);
                    }
                }
                return new_;
            })
           }        
           setMessage({message : "Question is Deleted." , visible : true})   
    }
    React.useEffect(()=>{
        getQuestions(1);
    },[])
    var questions_ =questions.map(question=> {
        return ( 
        <div className="d-flex align-items-center align-items-md-start align-items-xl-center">
            <div className='w-100'>
                <h4>{question.title}</h4>
                <p>{question.description && parse(question.description)}</p>
                
                <div className="d-flex  justify-content-around " >
                <Link to={"/DetailedQuestion/"+question.id} >Read More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                    </svg></Link>
                <Link to={"../UpdateQuestion/"+ question.id } >Update</Link>
                <p role="button" onClick={(e)=> {deletequestion(question.id)}}>Delete</p>
                </div>
          
        <hr className="mt-1 mb-0 border border-dark" />
      
    </div>
    </div>)
    })
    async function next_page()
  {
      if(questions.length < 10) return;
      await getQuestions(pagenumber+1)
      setPageNumber(old => old+1)
  }
  async function previous_page()
  {
      if(pagenumber == 1) return; console.log(pagenumber)

      await getQuestions(pagenumber-1)
      setPageNumber(old => old-1)
  }
  return (
    <>
    <div>
       <div className="container py-4 py-xl-5">
       <div className="row"><div className="col-md-10 col-xl-8 mx-auto p-4 border">
               {questions_}
           </div></div>
        </div>
        <div className='d-flex justify-content-center'>
     <ul className="pagination">
       <li className="page-item"><a className="page-link" onClick={previous_page} href="#">Previous</a></li>
       <li className="page-item"><a className="page-link" onClick={previous_page} href="#">{pagenumber===1 ? '#' : pagenumber -1}</a></li>
       <li className="page-item"><a className="page-link" href="#">{pagenumber}</a></li>
       <li className="page-item"><a className="page-link" onClick={next_page} href="#">{questions.length < 10 ? '#' : pagenumber + 1}</a></li>
       <li className="page-item"><a className="page-link" onClick={next_page} href="#">Next</a></li>
     </ul>
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
     </>
  )
}
