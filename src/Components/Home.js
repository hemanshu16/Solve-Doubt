import React from 'react'
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import "./Home.css";
import Tags from './Tags';
export default function Home() {
  const [questions, setQuestions] = React.useState([])
  const [searchmethod, setSearchMethod] = React.useState("Search By Text")
  const [tag, setTag] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [searchtext, setSearchText] = React.useState("")
  const [pagenumber, setPageNumber] = React.useState(1)
  const [search, setSearch] = React.useState("general")
  async function getQuestions(pagenumber) {
    pagenumber = pagenumber - 1;
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "jwt": localStorage.getItem('jwt')
    }

    let response = await fetch("https://localhost:7295/api/Questions?pagenumber=" + pagenumber, {
      method: "GET",
      headers: headersList
    });

    let data = await response.text();
    data = JSON.parse(data);
    console.log(pagenumber + 1, "    ", data + "-")
    setQuestions(data)

  }
  function changeSearchMethod() {
    setSearchMethod(old => {
      if (old == "Search By Text") {
        setSearchMethod("Search By Tags")
      }
      else {
        setSearchMethod("Search By Text")
      }
    })
  }
  React.useEffect(() => {
    getQuestions(1);
  }, [])
  function removeTag(tag) {
    setTags(old => {
      let new_ = []
      for (let i = 0; i < old.length; i++) {
        if (old[i] != tag) {
          new_.push(old[i])
        }
      }
      return new_
    })
  }
  let tags_ = tags.map(tag => {

    return <li className="list-group-item">{tag} <button type="button" onClick={() => { removeTag(tag) }} style={{ "outline": "none", "border": "none", "backgroundColor": "white", }} data-toggle="tooltip" data-placement="top" title="Remove Tag" className="ml-2 mb-1 close" aria-label="Close">
      <span aria-hidden="true" >&times;</span>
    </button></li>


  })

  function addTag() {

    setTags(old => {
      let new_ = [...old]
      new_.push(searchtext)
      return new_;
    })
    setSearchText("")
  }
  async function getQuestionsquery() {
    if (searchmethod == "Search By Text") {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
      }
      console.log(searchtext)
      let response = await fetch("https://localhost:7295/api/Questions/GetQuestionbyText?text=" + searchtext, {
        method: "GET",
        headers: headersList
      });

      let data = await response.text();
      if (response.status == 200) {
        data = JSON.parse(data)
        setQuestions(data)
      }

    }
    else {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
      }
      let query = ""
      let sign = ""
      tags.forEach(tag => {
        query = query + sign + "tags=" + tag
        sign = "&"
      });
      let response = await fetch("https://localhost:7295/api/Questions/GetQuestionByTags?" + query + "&pagenumber=0", {
        method: "GET",
        headers: headersList
      });
      console.log(query)

      let data = await response.text();
      if (response.status === 200) {
        data = JSON.parse(data)
        setQuestions(data)
      }


    }
  }
  var questions_ = questions.map(question => {
    return (
      <div className="question">
        <div className="question-header">
          <div className="question-username">{question.username}</div>
          <div className="question-date">{new Date(question.update_date).toDateString()}</div>
        </div>
        <h3>{question.title}</h3>
        <div className="question-description" style={{ "height": "43px", "overflow": "hidden" }}>
          <p>{question.description != undefined ? parse(question.description) : ""}</p>
        </div>

        <Tags tags={question.tag} />
        <Link to={"DetailedQuestion/" + question.id} >Read More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                    </svg></Link>
      </div>

        /*<div className="row"><div className="col-md-10 col-xl-8 mx-auto p-4">
            <div className="d-md-flex d-lg-flex d-xl-flex d-xxl-flex ">
                                <p>UserName :- {question.username}</p> &nbsp; &nbsp;
                                <p>Last Updated :- {new Date(question.update_date).toLocaleTimeString() + "  " +new Date(question.update_date).toDateString()}</p>
                            </div>
        <div className="d-flex align-items-center align-items-md-start align-items-xl-center">
            <div>
            
                <h4>{question.title}</h4>
                <p>{question.description != null && parse(question.description)}</p>
                
                <div className="d-flex  justify-content-around " >
                <Link to={"../DetailedQuetion/"+question.id} >Read More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                    </svg></Link>
               
                </div>
            </div>
        </div>
        <hr className="mt-1" />
      
    </div>
    </div> */)
  })
  async function next_page() {
    if (questions.length < 10) return;
    await getQuestions(pagenumber + 1)
    setPageNumber(old => old + 1)
  }
  async function previous_page() {
    if (pagenumber == 1) return; console.log(pagenumber)

    await getQuestions(pagenumber - 1)
    setPageNumber(old => old - 1)
  }
  return (<>
    <div>
      <div className="container pb-5 pt-5 text-center">
        <p onClick={changeSearchMethod}>{searchmethod}</p>
        <div className='d-flex justify-content-center'>
          <div className="col-md-9 col-sm-12 d-flex justify-content-center">


            <input className="form-control w-50" type="text" value={searchtext} onChange={e => { setSearchText(e.target.value) }} name="search" placeholder="Search..." />
            &nbsp;
            {searchmethod == "Search By Tags" ? <button className="btn btn-primary  rounded-pill" onClick={addTag}>Add Tag</button>
              : ""}
            <button className="btn btn-primary  rounded-pill" onClick={getQuestionsquery}><i className="fa fa-search"></i></button>

          </div>
        </div>
        {searchmethod == "Search By Tags" ?
          <div className='d-flex justify-content-center mt-3'>
            <ul className="list-group" style={{ "max-width": "1000px" }}>
              {tags_}
            </ul></div> : ""}
      </div>

      <div className="container1">
        <h3 style={{"text-decoration" : "underline", "textAlign" : "center", "marginBottom" : "20px"}}> Questions</h3>
        {questions_}


      </div>

    </div>
    <div className='d-flex justify-content-center'>
      <ul className="pagination">
        <li className="page-item"><a className="page-link" onClick={previous_page} href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" onClick={previous_page} href="#">{pagenumber === 1 ? '#' : pagenumber - 1}</a></li>
        <li className="page-item"><a className="page-link" href="#">{pagenumber}</a></li>
        <li className="page-item"><a className="page-link" onClick={next_page} href="#">{questions.length < 10 ? '#' : pagenumber + 1}</a></li>
        <li className="page-item"><a className="page-link" onClick={next_page} href="#">Next</a></li>
      </ul>
    </div>
  </>
  )
}
