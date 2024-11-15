import styled from "styled-components";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "./BlueButton";
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
`
const H1Tag = styled.h1`
color: white;
font-size: 1.8rem;
font-family: arial;
`


const CenterPageDiv = styled.div`
padding: 30px 28px;
`
function AskPage(){
const [question, setQuestion] = useState("");
const [topic, setTopic] = useState("");

const handleTopicChange = event => setTopic(event.target.value);
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
    <TitleInput placeholder="Title of your Question" onChange={handleTopicChange}></TitleInput>
    <TextAreaTag placeholder="Enter Question here" onChange={handleQuestionChange}></TextAreaTag>
    {/* <select className="custom-select" size="3">
  <option selected>Open this select menu</option>
  <option value="1">Java</option>
  <option value="2">MySql</option>
  <option value="3">React</option>
</select> */}
    <BlueButton onClick={handleSubmitClick} >Submit</BlueButton>
    </CenterPageDiv>
    </>
)
}

export default AskPage;