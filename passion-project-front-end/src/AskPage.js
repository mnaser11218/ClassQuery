import styled from "styled-components";
import {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "./styled-components/BlueButton";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";
import PreviewArea from "./styled-components/PreviewArea";
import SimpleTags from "./SimpleTags";



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



const CenterPageDiv = styled.div`
padding: 30px 28px;
`
function AskPage(){
const [question, setQuestion] = useState("");
const [topic, setTopic] = useState("");
//testing 
// tags: 


// tags methods
//     const suggestions = [
//     { value: 3, label: 'Bananas' },
//     { value: 4, label: 'Mangos' },
//     { value: 5, label: 'Lemons' },
//     { value: 6, label: 'Apricots', disabled: true },
//   ]



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
    <H1HeaderTag>Ask A Question</H1HeaderTag>

    <TitleInput 
    type="text"
    value={topic}
    placeholder="Title of your Question"
     onChange={e=>setTopic(e.target.value)}/>

    <StyledInput 
        type="text"
        value={question}
        placeholder="Enter Question here" 
        onChange={e=>setQuestion(e.target.value)}
    />
    
    {/* <select className="custom-select" size="3">
  <option selected>Open this select menu</option>
  <option value="1">Java</option>
  <option value="2">MySql</option>
  <option value="3">React</option>
</select> */}

      <PreviewArea>
      <ReactMarkdown remarkPlugins={[gfm]} children={question}/>
      </PreviewArea>
      <SimpleTags/>
      <BlueButton onClick={handleSubmitClick} >Submit</BlueButton>
      
    </CenterPageDiv>
    {/* <Tags/> */}
    
    </>
)
}

export default AskPage;