import styled from "styled-components"
import { useState } from "react";
import PreviewArea from "../styled-components/PreviewArea";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import BlueButton from "../styled-components/BlueButton";
import { useNavigate } from "react-router-dom";
import { useUser } from "../CurrentUser";
import GPT3Component from "../OpenAI/GPT3GrammarCheck";
import GPT1RewordQuestion from "../OpenAI/GPT1RewordQuestion";
import GPT2Translation from "../OpenAI/GPT2Translation";
// import AskChat from "./OpenAI/AskChat";
import AskChatAQues from "../OpenAI/AskChatAQues";
const PostBodyText = styled.textarea`
background:none;
display:block;
width: 100%;
min-height: 100px;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 2px solid #F8F7E5;
border-radius: 5px;
color: #fff;
`
const AiButtons = styled.div`
  display: flex; 
  flex-direction: rows; 
  //align-items: center; 

`
function PostBodyTextArea({...props}){
  const { currentLoggedInUser } = useUser()
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("")
    const {questionId} = props;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY


    let navigate = useNavigate(); 
        var routeChange = ()=> {
            let path = `/answerspage/${questionId}`; 
            navigate(path);
        }

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
                    },
                    userProfile: currentLoggedInUser?.id ? {
                      id: currentLoggedInUser.id
                    } : null
                  
              })
          }).then(res => res.json())
            .then(res => console.log(res));
            setAnswer("");
            routeChange()
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
      <div style={{"margin": "15px 0px 5px 0px",
"padding": "7px 0px 10px 0px"}}> AI Features:</div>
      <AiButtons>
        
        
      <GPT3Component apiKey={apiKey} onUpdateInputValue={setAnswer} answer={answer}/>
      <GPT1RewordQuestion apiKey={apiKey} onUpdateInputValue={setAnswer} answer={answer} /> 
      <GPT2Translation apiKey={apiKey} onUpdateInputValue={setAnswer} answer={answer} /> 
      </AiButtons>



      <AskChatAQues  apiKey={apiKey} onUpdateInputValue={setQuestion} question={question} /> 
     { question ? <PreviewArea>
      <ReactMarkdown remarkPlugins={[gfm]} children={question}/>
      </PreviewArea>  : " "} 
      <BlueButton onClick={handlePostAnswer}>Post Your Answer</BlueButton>
    </>)
}
export default PostBodyTextArea;