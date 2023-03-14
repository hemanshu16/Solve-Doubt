import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Home.css"
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
export default function ViewDetailedQuestion() {
    const {questionId} = useParams();
    const [question,setQuestion] = React.useState({})
    const [answers, setAnswers] = React.useState()
    const [isupdate, setIsUpdate] = React.useState(false)
    const [updateid,setUpdateId] = React.useState("")
    const [userid, setUserid] = React.useState("")
    React.useEffect(()=>{
         get_question();
         get_answers();
         setUserid(localStorage.getItem("id"))
        
    },[])
    const editorRef = useRef(null);
    const editorRefUpdate = useRef(null);
    async function Add_Answer()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "jwt" : localStorage.getItem('jwt')
           }
           
           let bodyContent = JSON.stringify({
             "question_id": questionId,
            
             "answer": editorRef.current.getContent()
             
           });
           
           let response = await fetch("https://localhost:7295/api/Answers", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           setAnswers(old => {
              let new_ = []
              for(let i=0;i<old.length; i++)
              {
                new_.push(old[i])
              }
              new_.push(data)
              return new_;
           })           
    }
    async function get_question()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "id" : questionId
           }
           
           let response = await fetch("https://localhost:7295/api/Questions/" + questionId, { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           setQuestion(data)
           console.log(data)
    }
   async function get_answers()
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "id" : questionId
           }
           
           let response = await fetch("https://localhost:7295/api/Answers/GetAnswers?id=" + questionId, { 
             method: "GET",
             headers: headersList
           });
           
           let data = await response.text();
           data = JSON.parse(data)
           setAnswers(data)
           console.log(data)
    }
    async function remove_answer(id)
    {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "jwt": localStorage.getItem("jwt")
           }
           
           let response = await fetch("https://localhost:7295/api/Answers/" + id, { 
             method: "DELETE",
             headers: headersList
           });
           
           let data = await response.text();
           console.log(data);
           
        setAnswers(old => {
           let new_ = []
            for(let i=0;i<old.length; i++)
            {
                if(old[i].id != id)
                {
                    new_.push(old[i])
                }
            }
            return new_
        })
    }
    async function update_answer(id)
    {
        let index ;
        let new_answer = []
        for(let i=0;i<answers.length;i++)
        {
            new_answer.push(answers[i])
            if(answers[i].id === updateid)
            {
                index = i
                break
            }

        }
        if(updateid === id)
       { setIsUpdate(false)
         id = "";
       }
       else if(updateid === "")
       { setIsUpdate(true)     
         
       }
        
         if(updateid != ""){
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "jwt": localStorage.getItem('jwt'),
            "Content-Type": "application/json"
           }
           let content = editorRefUpdate.current.getContent()
           let bodyContent = JSON.stringify({
              ...answers[index],answer : content
           });
           if(isupdate){
           let response = await fetch("https://localhost:7295/api/Answers/" + updateid, { 
             method: "PUT",
             body: bodyContent,
             headers: headersList
           });
           
           let data = await response.text();
        //    if(updateid === id) id = "";
        //    setIsUpdate(false)
           if(response.status == 204)
           {
               setAnswers(old => {
                let new_ = []
                for(let i=0;i<old.length;i++)
                 {
                    new_.push(old[i])
                 }
                 new_[index].answer = content
                 return new_
               })
            }
            console.log(response)
        }
       }
        setUpdateId(id)
      
           
    }
    var tags = []
    if(question.tag != undefined){
    tags = question.tag.map(tag => {
               return ( <p key={tag.id} style={{"display":"inline-block","margin":"0px 5px"}}>{tag.tag_Name}</p>)
                
    })
}

  var answers_ = []
  if(answers != undefined){
   answers_ = answers.map(answer => {
    return (<div className="container2">
          <div className="question">
            <div className="question-header">
              <div className="question-username">{answer.username}</div>
              <div className="question-date">{new Date(answer.update_date).toDateString()} at { new Date(answer.update_date).toLocaleTimeString() }</div>
            </div>
            {/* <h3>{q.title}</h3> */}
            <div className="question-description" >
            { (isupdate && (updateid == answer.id)) ?  "" :
         <p >{answer.answer && parse(answer.answer)}</p>
           }
             

            </div>
            <div className="editor" style={{"overflow" : "scroll"}}>
                
            {isupdate && answer.id == updateid ? 
            <Editor
            apiKey="ucvs30a0zhhfcrzw215igwkcyjgjm8hkifvvozpbk8ycjbcf"
            onInit={(evt, editor) => (editorRefUpdate.current = editor)}
            initialValue={answer.answer}
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
        /> : "" 
        }</div>
           {answer.user_id == userid ? 
           <div className="d-flex">
          
           <button className="btn btn-outline-dark" onClick={e => {update_answer(answer.id)}}>update</button>
           &nbsp; &nbsp;
           <button className="btn btn-outline-dark" onClick={e=> {remove_answer(answer.id)}}>delete</button>
           
           </div> : ""  }  
          </div>
 
       
       
    
</div>);
   })}
    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-11 single-content">
                        <br/><br/>
                        <h2 className="mb-4">
                            {question.title}
                        </h2>
                        <div className="post-meta d-flex mb-5">
                            <div className="bio-pic mr-3">
                            </div>
                            <div className="vcard">
                                <span className="d-block"><a href="abc">{question.username}</a> </span>
                                <span className="date-read">{new Date(question.update_date).toDateString() }<span className="mx-1">•</span> Last Updated <span className="icon-star2"></span></span>
                            </div>
                        </div>
                        <div className='bg-primary-gradient'>
                        {question.description && parse(question.description)}
                        </div>
                        <div className="pt-5">
                        <p>Tags</p>
                           {tags}
              
                        </div>
                        <div className="pt-5">
                            <div className="section-title">
                                <h2 className="mb-5">6 Answers  </h2>
                            </div>
                            <ul className="comment-list">
                                {answers_}
                              
                            </ul>

                            <div className="comment-form-wrap pt-5">
                                <div className="section-title">
                                    <h2 className="mb-5">Write a Answer</h2>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                
                </div>
                <div className="mt-3 d-flex justify-content-center">
                    <Editor
                        apiKey="ucvs30a0zhhfcrzw215igwkcyjgjm8hkifvvozpbk8ycjbcf"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={"Write Answer..."}
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
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <button className="btn btn-primary shadow  w-10 " onClick={Add_Answer}>Add Answer</button></div>

        </div>
    )
}
