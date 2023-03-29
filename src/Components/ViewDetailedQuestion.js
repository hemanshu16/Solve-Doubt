import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./Home.css"
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Tags from "./Tags";
export default function ViewDetailedQuestion() {
    const { questionId } = useParams();
    const [question, setQuestion] = React.useState({})
    const [answers, setAnswers] = React.useState()
    const [isupdate, setIsUpdate] = React.useState(false)
    const [updateid, setUpdateId] = React.useState("")
    const [userid, setUserid] = React.useState("")
    const[message, setMessage] = React.useState({
        message : "",
        visible : false
    })
    function closeToast() {
        setMessage({ message: "", visible: false });
    }
    React.useEffect(() => {
        add_view();
        get_question();
        get_answers();
        setUserid(localStorage.getItem("id"))

    }, [])

    const editorRef = useRef(null);
    const editorRefUpdate = useRef(null);

    const add_view = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }

        let response = await fetch("https://localhost:7295/api/Questions/AddView/" + questionId, {
            method: "PUT",
            headers: headersList
        });

        let data = await response.text();
        console.log("View added");

    }

    async function Add_Answer() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "jwt": localStorage.getItem('jwt')
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
            for (let i = 0; i < old.length; i++) {
                new_.push(old[i])
            }
            new_.push(data)
            return new_;
        })
        setMessage({message : "Answer Added" , visible : true})

    }
    async function get_question() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "id": questionId
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
    async function get_answers() {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }

        let response = await fetch("https://localhost:7295/api/Answers/GetAnswers/" + questionId, {
            method: "GET",
            headers: headersList
        });

        let data = await response.text();
        data = JSON.parse(data);

        setAnswers(data)
        console.log(data)
    }
    async function remove_answer(id) {
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
            for (let i = 0; i < old.length; i++) {
                if (old[i].id != id) {
                    new_.push(old[i])
                }
            }
            return new_
        })
        setMessage({message : "Answer Deleted" , visible : true})

    }
    async function add_remove_upvote(id, upvoted) {
        if (!upvoted) {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "id": 0,
                "userid": 0,
                "answerid": id,
                "questionid": questionId
            });

            let response = await fetch("https://localhost:7295/api/Upvotes/", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            console.log(data);
            setAnswers(old => {
                let new_ = []
                let index = 0;
                for (let i = 0; i < old.length; i++) {
                    if (old[i].id == id) {
                        index = i;
                    }
                    new_.push(old[i])
                }
                new_[index].upvoted = !new_[index].upvoted;
                new_[index].upvotes = new_[index].upvotes + 1;
                return new_
            })
            setMessage({message : "UpVote Added" , visible : true})


        }
        else {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }

            let response = await fetch("https://localhost:7295/api/Upvotes/" + id, {
                method: "DELETE",
                headers: headersList
            });

            let data = await response.text();
            console.log(data);
            setAnswers(old => {
                let new_ = []
                let index = 0;
                for (let i = 0; i < old.length; i++) {
                    if (old[i].id == id) {
                        index = i;
                    }
                    new_.push(old[i])
                }
                new_[index].upvoted = !new_[index].upvoted;
                new_[index].upvotes = new_[index].upvotes - 1;

                return new_
            })
            setMessage({message : "Upvote Decremented" , visible : true})
            
        }
    }
    async function update_answer(id) {
        let index;
        let new_answer = []
        for (let i = 0; i < answers.length; i++) {
            new_answer.push(answers[i])
            if (answers[i].id === updateid) {
                index = i
                break
            }

        }
        if (updateid === id) {
            setIsUpdate(false)
            id = "";
        }
        else if (updateid === "") {
            setIsUpdate(true)

        }

        if (updateid != "") {
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "jwt": localStorage.getItem('jwt'),
                "Content-Type": "application/json"
            }
            let content = editorRefUpdate.current.getContent()
            let bodyContent = JSON.stringify({
                ...answers[index], answer: content
            });
            if (isupdate) {
                let response = await fetch("https://localhost:7295/api/Answers/" + updateid, {
                    method: "PUT",
                    body: bodyContent,
                    headers: headersList
                });

                let data = await response.text();
                //    if(updateid === id) id = "";
                //    setIsUpdate(false)
                if (response.status == 204) {
                    setAnswers(old => {
                        let new_ = []
                        for (let i = 0; i < old.length; i++) {
                            new_.push(old[i])
                        }
                        new_[index].answer = content
                        let date = new Date();
                        new_[index].update_date = null;

                        return new_
                    })
                    setMessage({message : "Answer Updated" , visible : true})
                }
                console.log(response)
            }
        }
        setUpdateId(id)


    }
   

    var answers_ = []
    if (answers != undefined) {
        answers_ = answers.map(answer => {
            return (<div className="container2 " >
                <div className="question">
                    <div className="question-header">
                        <div className="question-username">{answer.username}</div>
                        <div className="question-date">{
                             answer.update_date == null ?
                             new Date().toDateString() + " at " + new Date().toLocaleTimeString()
                              : new Date(answer.update_date).toDateString() + " at "  +new Date(answer.update_date).toLocaleTimeString() 
                            
                         }
                         </div>
                         </div>
                    
                    {/* <h3>{q.title}</h3> */}
                    <div className="question-description" >
                        {(isupdate && (updateid == answer.id)) ? "" :
                            <p >{answer.answer && parse(answer.answer)}</p>
                        }


                    </div>
                    <div className="editor" style={{ "overflow": "scroll" }}>

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
                    <div className="d-flex d-flex justify-content-between">
                        <div className="d-flex">
                            {answer.user_id == userid ?
                                <>
                                    <button className="btn btn-outline-dark" onClick={e => { update_answer(answer.id) }}>update</button>
                                    &nbsp; &nbsp;
                                    <button className="btn btn-outline-dark" onClick={e => { remove_answer(answer.id) }}>delete</button>
                                </>
                                : ""}
                        </div>
                        <div></div>
                        <div className="align-self-center" style={{"cursor" : "pointer"}}> {answer.upvotes} Upvotes
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={answer.upvoted ? "blue" : "black"} onClick={e => add_remove_upvote(answer.id, answer.upvoted)} className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            </svg>
                            
                        </div>
                    </div>
                </div>




            </div>);
        })
    }
    return (
      <>
        <div>

            <div className="container border">
                <div className="row d-flex justify-content-center">
                    <div className="col-11 single-content">
                        <br /><br />
                        <h2 className="mb-4">
                            {question.title}
                        </h2>

                        <div className="post-meta d-flex mb-5">
                            <div className="bio-pic mr-3">
                            </div>
                            <div className="vcard">
                                <span className="d-block"><a href="abc">{question.username}</a> </span>
                                <span className="date-read">{new Date(question.update_date).toDateString()}<span className="mx-1">•</span> Last Updated <span className="icon-star2"> • views  {question.views}</span></span>
                            </div>
                        </div>
                        <div className="pt-5" style={{"color" : "black"}}>
                            {question.tag ? <>
                            <span className="border-bottom border-dark h4">Tags</span>
                            <Tags tags={question.tag} /> </> : "" }
                        </div>
                        <div className='bg-light p-5'>
                            {question.description && parse(question.description)}
                        </div>
                       
                        <div className="pt-5">
                            <div className="section-title">
                                <h2 className="mb-5">{answers_.length} Answers  </h2>
                            </div>
                            <ul className="comment-list">
                                {answers_}

                            </ul>

                            <div className="comment-form-wrap pt-5">
                                <div className="section-title">
                                    <h2 className="mb-5 text-decoration-underline">Write Answer</h2>
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
                    <div className="mt-3 d-flex justify-content-center">
                <button className="btn btn-outline-primary shadow  w-10 mb-3" onClick={Add_Answer}>Add Answer</button></div>

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
        </div></>
    )
}
