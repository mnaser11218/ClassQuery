import styled from "styled-components"
import { useState } from "react";
import PreviewArea from "../styled-components/PreviewArea";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import BlueButton from "./BlueButton";

const PostBodyText = styled.textarea`
background:none;
display:block;
width: 100%;
min-height: 100px;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 1px solid #777;
border-radius: 5px;
color: #fff;
`
function PostBodyTextArea({...props}){
    const [answer, setAnswer] = useState("");
    const {questionId} = props;

    const handlePostAnswer = ()=>{
        fetch('http://localhost:8080/api/answers', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                    answer: answer,
                    createdDate: new Date(),
                    question: {
                      id: questionId
                    }
                  
              })
          }).then(res => res.json())
            .then(res => console.log(res));
            setAnswer("");
    }

    return (
    <>
    

    <PostBodyText
        type="text"
           value={answer}
           placeholder="Enter Answer here" 
           onChange={e=>setAnswer(e.target.value)}
    />
    <PreviewArea>
      <ReactMarkdown remarkPlugins={[gfm]} children={answer}/>
      </PreviewArea>
      <BlueButton onClick={handlePostAnswer}>Post Your Answer</BlueButton>
    </>)
}
export default PostBodyTextArea;