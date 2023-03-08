import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useParams } from 'react-router-dom';

export default function UpdateQuestion(props) {
    const { questionId } = useParams();
    console.log(questionId)
    const [question, setQuestion] = React.useState({
        title : "",
        description : "",
        
    });
    const [tags,setTags] = React.useState([
       
    ] )
    const [questionid, setQuestionId] = React.useState("");
    const [tag,setTag] = React.useState("")
    const editorRef = useRef(null);

    

    async function get_question_by_id()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
           }
           
           let response = await fetch("https://localhost:7295/api/Questions/" + questionId, { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           setTags(data.tag)
           delete data.tag
           setQuestionId(questionId)
           setQuestion(data)
           return data
    }
    async function create_question()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({});
           
           let response = await fetch("https://localhost:7295/api/Questions", { 
             method: "POST",
             body: JSON.stringify({}),
             headers: headersList
           });
           
           let data = await response.text()
           data = JSON.parse(data)
           setQuestionId(data.id)
           setQuestion(data)
        //    setTags(data.tag)
           delete data.tag
           console.log(data)
           return data
           
    }
    React.useEffect(() => {
       let question_ ;
       if(questionId == undefined)
       {   
           create_question();
       }
       else{
           get_question_by_id(); 
       }
       
    }, [])
   async function removeTag(id)
    {  
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "id": id
           }
           
           let response = await fetch("https://localhost:7295/api/Tags/" + id, { 
             method: "DELETE",
             headers: headersList
           });
           
           let data = await response.text();
           
           

        setTags(old => {
            var tags_new = []
            for(let i=0; i<old.length; i++)
            {
                if(old[i].id != id)
                {
                    tags_new.push(old[i])
                }
            }
            return tags_new
        })
    }
    async function addTag()
    {    
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             tag_Name: tag,
             question_id: questionid
           });
           
           let response = await fetch("https://localhost:7295/api/Tags", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           console.log(data);
           


        setTags(old => {
            var tags_new = []
            for(let i=0; i<old.length; i++)
            {
                    tags_new.push(old[i])
            }
            tags_new.push(data)
            return tags_new
        })
    }

    async function update_question()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "id": questionid,
            "jwt": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "id": questionid,
             "title": question.title,
             "description": editorRef.current.getContent(),
             "user_id": 0,
             "update_date": question.update_date,
             "username" : question.username
           });
           console.log(question)
           let response = await fetch("https://localhost:7295/api/Questions/" + questionid, { 
             method: "PUT",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.status;
           data = JSON.parse(data);
           console.log(data);
    }
 
   const Tags = tags.map(tag => {
        return  <li className="d-lg-flex  " key={tag.id}> {tag.tag_Name}
        <button type="button" onClick={() => {removeTag( tag.id )}} style={{ "outline": "none", "border": "none", "backgroundColor": "white", }} data-toggle="tooltip" data-placement="top" title="Remove Tag" className="ml-2 mb-1 close" aria-label="Close">
            <span aria-hidden="true" >&times;</span>
        </button>

    </li> 
    })
    function handledata(e)
    {
        setQuestion(old => {
            return {...old, [e.target.name] : e.target.value}
        })
    }
    return (
        <div>
            <>
                <section className="py-5">
                    <div className="container py-5">
                        <div className="row mb-4 mb-lg-5">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <h2 className="fw-bold">Write Question</h2>
                            </div>
                        </div><textarea className="my-4 form-control" placeholder="Write your question" name="title" value={question.title} onChange={handledata}></textarea>
                        <div className="mb-3  d-flex justify-content-center">
                            <input className="form-control " type="text" name="tag" placeholder="tagname"  value={tag} onChange={(e) => {setTag(e.target.value)}}/> &nbsp; &nbsp;
                            <button className="btn btn-primary shadow " type='button' onClick={addTag} >Add</button>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 col-xl-4">
                                <div className="card">
                                    <div className="card-body text-center d-flex flex-column align-items-center">
                                        <form className="w-100" method="post">

                                            <ul className="list text-start mx-4 w-75">
                                                {Tags}
                                               
                                            </ul>
                                            <div className="mb-3"></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100"></div>
                        </div>
                    </div>
                </section><div className="mt-3 d-flex justify-content-center">
                    <Editor
                        apiKey="ucvs30a0zhhfcrzw215igwkcyjgjm8hkifvvozpbk8ycjbcf"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={question.description}
                        init={{
                            width: 1100,
                            menubar: true,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    /></div>
            </>
            <div className="mt-3 d-flex justify-content-center">
                <button className="btn btn-primary shadow  w-10 " onClick={update_question}>Save</button></div>

        </div>
    )
}
