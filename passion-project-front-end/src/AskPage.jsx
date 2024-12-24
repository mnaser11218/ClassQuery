import styled from "styled-components";
import {useRef, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BlueButton from "./styled-components/BlueButton";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import H1HeaderTag from "./styled-components/H1HeaderTag";
import PreviewArea from "./styled-components/PreviewArea";
// import UserContext from "./UserContext";
// import SimpleTags from "./SimpleTags";
import Tags from "./Tags";
import { useUser } from "./CurrentUser";
import GPT3Component from "./OpenAI/GPT3GrammarCheck";
import GPT1RewordQuestion from "./OpenAI/GPT1RewordQuestion";
import GPT2Translation from "./OpenAI/GPT2Translation";



const TitleInput = styled.input`
background:none;
display:block;
width: 100%;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 1px solid #F8F7E5;
border-radius: 5px;
color: #fff;
`

const StyledInputQuestion = styled.textarea`
background:none;
display:block;
width: 100%;
min-height: 100px;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 1px solid #F8F7E5;
border-radius: 5px;
color: #fff;
`

const CenterPageDiv = styled.div`
padding: 30px 28px;
`
const AiButtons = styled.div`
  display: flex; 
  flex-direction: rows; 
  //align-items: center; 

`
function AskPage(){
const [question, setQuestion] = useState("");
const [topic, setTopic] = useState("");
const [tags, setTags] = useState([]); // State to hold the tags
//const user= useContext(UserContext);
// const [inputValue, setInputValue] = useState('');
const apiKey = process.env.REACT_APP_OPENAI_API_KEY


const params = useParams();
const assignmentId = params?.id;

const { currentLoggedInUser } = useUser()

  const handleQuestionChange = event => setQuestion(event.target.value)
  let navigate = useNavigate(); 
        var routeChange = ()=> {
            let path = `/`; 
            navigate(path);
        }
const handleSubmitClick = ()=>{
    const tagsId = tags.map(tag=> ({id:tag.value}))
    fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            title: topic,
            question: question,
            createdDate: new Date(),
            tags: tagsId,
            userProfile: currentLoggedInUser?.id ? {
              "id": currentLoggedInUser?.id
          } : null,  
          assignment: assignmentId ? {"id": assignmentId} : null
          })
      }).then(res => res.json())
        .then(res => console.log(res));
      routeChange()
}

return(
    <>
    <CenterPageDiv>
   <H1HeaderTag>Welcome {currentLoggedInUser?.name ?currentLoggedInUser?.name : ""  }.</H1HeaderTag> 

    <TitleInput 
    type="text"
    value={topic}
    placeholder="Title of your Question"
     onChange={e=>setTopic(e.target.value)}/>

    <StyledInputQuestion 
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
      <Tags setTags={setTags} tags={tags} />
      
      <AiButtons>
        <div style={{"margin": "20px",
"padding": "7px 0px 10px 0px"}}> AI Features:</div>
        
      <GPT3Component apiKey={apiKey} onUpdateInputValue={setQuestion} question={question}/>
      <GPT1RewordQuestion apiKey={apiKey} onUpdateInputValue={setQuestion} question={question}/> 
      <GPT2Translation apiKey={apiKey} onUpdateInputValue={setQuestion} question={question} /> 
      </AiButtons>
      <BlueButton onClick={handleSubmitClick} >Submit</BlueButton>
    </CenterPageDiv>
 

    </>
)
}

export default AskPage;