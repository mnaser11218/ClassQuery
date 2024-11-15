import styled from "styled-components";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "./BlueButton";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const TitleInput = styled.input`
background:none;
display:block;
width: 100%;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 1px solid #777;
border-radius: 5px;
color: #fff;
`

const TextAreaTag = styled.textarea`
background: none;
display:block;
width: 100%;
min-height: 200px;
padding: 10px;
border: 2px solid #777;
border-radius: 5px;
margin-bottom: 20px;
color: #fff;
font-family:inherit;
`
const H1Tag = styled.h1`
color: white;
font-size: 1.8rem;
font-family: arial;
`
const PreviewArea = styled.div`
padding: 10px 20px;
background-color: #666;
margin-bottom:20px;
border-radius: 5px;

`

const CenterPageDiv = styled.div`
padding: 30px 28px;
`
function AskPage(){
const [question, setQuestion] = useState("");
const [topic, setTopic] = useState("");

  const handleQuestionChange = event => setQuestion(event.target.value)
  let navigate = useNavigate(); 
        var routeChange = ()=> {
            let path = `/`; 
            navigate(path);
        }
const handleSubmitClick = ()=>{
      
    fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            title: topic,
            question: question,
            createdDate: new Date()})
      }).then(res => res.json())
        .then(res => console.log(res));
      routeChange()
}
return(
    <>
    <CenterPageDiv>
   
        <H1Tag>Ask A Question</H1Tag>
    <TitleInput 
    type="text"
    value={topic}
    placeholder="Title of your Question"
     onChange={e=>setTopic(e.target.value)}/>

    
    <TextAreaTag
    type="text"
    value={question}
    placeholder="Enter Question here" 
    onChange={e=>setQuestion(e.target.value)}/>
    {/* <select className="custom-select" size="3">
  <option selected>Open this select menu</option>
  <option value="1">Java</option>
  <option value="2">MySql</option>
  <option value="3">React</option>
</select> */}
{console.log("the question is: " + question)}
    <PreviewArea>
      <ReactMarkdown remarkPlugins={[gfm]} children={question}/>
      </PreviewArea>
      <BlueButton onClick={handleSubmitClick} >Submit</BlueButton>

    </CenterPageDiv>
    </>
)
}

export default AskPage;