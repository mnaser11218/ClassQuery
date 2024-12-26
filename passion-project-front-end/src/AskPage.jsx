import styled from "styled-components";
import {useRef, useState, useContext, useEffect} from "react";
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
import GPT4AskChat from "./OpenAI/GPT4AskChat";
import AskChat from "./OpenAI/AskChat";
import axios from "axios";



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
const [newQuesId, setNewQuesId] = useState('')
const [topic, setTopic] = useState("");
const [tags, setTags] = useState([]); // State to hold the tags
const [checked, setChecked] = useState(false)
const [chatGPTAnswer, setChatGPTAnswer] =useState("")
//const user= useContext(UserContext);
// const [inputValue, setInputValue] = useState('');
const apiKey = process.env.REACT_APP_OPENAI_API_KEY


const params = useParams();
const assignmentId = params?.id;

const { currentLoggedInUser } = useUser()

  const handleQuestionChange = event => setQuestion(event.target.value)
  let navigate = useNavigate(); 
  let routeChange = ()=> {
      let path = `/questionspage`; 
      navigate(path);
    }

    useEffect(() => {
      if (chatGPTAnswer) {
          console.log("State updated and ready to be used:", chatGPTAnswer + "ques id is: " + newQuesId);
       postAnswer()
       routeChange()
      }
  }, [chatGPTAnswer]);

var postQuestion = () => {
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
      .then(res => {
        setNewQuesId(()=>res.id)
        if(checked){
          sendChatGPT()
        }
      });
   
}

var sendChatGPT = ()=>{
  axios.post('https://api.openai.com/v1/chat/completions',
    {
        "model": "gpt-3.5-turbo",
       
       "messages": [
          {
            "role": "user",
            
            "content": `Answer this question in a concise way: ${question}`
          }
        ],
          "max_tokens": 1000
      }, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  const gptResponse = response.data.choices[0].message.content
  setChatGPTAnswer(prevState => gptResponse);  
console.log("this is the response from chatgpt : " + chatGPTAnswer  + "\n question id is: "  + newQuesId )
})
.catch(error => {
  console.error('Error:', error);
});
}
var postAnswer = ()=>{
    fetch('http://localhost:8080/api/answers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
                answer: chatGPTAnswer,
                createdDate: new Date(),
                question: {
                  id: newQuesId
                },
                userProfile: {
                  id: 1
                } 
              
          })
      }).then(res => res.json())
        .then(res => console.log(res));
}


const handleSubmitClick = ()=>{
  postQuestion()
 
  
}

return(
    <>
    <CenterPageDiv>
   <H1HeaderTag>Ask your Question: </H1HeaderTag> 

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
      {/* <img src={require("./OpenAI/chaticon.png")} style={{ width: 50 }} alt="" />  */}
      <div style={{"margin": "15px 0px 5px 0px",
"padding": "7px 0px 10px 0px"}}>  AI Features:</div>
      <AiButtons>
        
      
        
      <GPT3Component apiKey={apiKey} onUpdateInputValue={setQuestion} question={question}/>
      <GPT1RewordQuestion apiKey={apiKey} onUpdateInputValue={setQuestion} question={question}/> 
      <GPT2Translation apiKey={apiKey} onUpdateInputValue={setQuestion} question={question} /> 
      {/* <GPT4AskChat apiKey={apiKey} onUpdateInputValue={setQuestion} question={question} />  */}

      </AiButtons>
      <AskChat onChecked={setChecked} />
      <BlueButton onClick={handleSubmitClick} >Submit</BlueButton>
    </CenterPageDiv>
        

    </>
)
}

export default AskPage;