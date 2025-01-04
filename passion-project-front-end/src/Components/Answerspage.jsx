
import styled from "styled-components"
import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import H1HeaderTag from "../styled-components/H1HeaderTag";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PreviewArea from "../styled-components/PreviewArea";
import UserLink from "../styled-components/UserLink";
import WhoAndWhen from "../styled-components/WhoAndWhen";
import VotingButtons from "./VotingButtons";
import H2HeaderTag from "../styled-components/H2HeaderTag";
import PostBodyTextArea from "./PostBodyTextArea";
import AllAnswersListPage from "./AllAnswersListPage";
import { useUser } from "../CurrentUser";
import "../App.css"

 

const CenterPageDiv = styled.div`
padding: 30px 28px;
`


const User = styled.a`
color: rgb(27, 117, 208);
font-size: 0.7rem;
float: right;
padding: 10px 0;
`
const AnswerMeta = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
border-radius: 5px;
`
const BodyTag = styled.div`
display: grid;
grid-template-columns: 50px 1fr;
border-radius: 5px;
column-gap: 40px;
padding-top: 10px;
`


function AnswersPage(){
  
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion]= useState("")
  const [userProfileName, setUserProfileName] =useState("")
  const [displayedText, setDisplayedText] = useState(' ');
  const fullText = "Hello, welcome to the typewriter effect in React!";
  const {currentLoggedInUser} = useUser();
 
  useEffect(()=>{
    fetchQuestion();   
  }, [])


  useEffect(()=>{
    if(question){
      fetchUserProfileName()
    }
   
  },[question])

  useEffect(() => {
    let index = 0;
    
    // Clear previous typing effect on re-render or when the component is reset
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);  // Append one character at a time
      index++;

      // Stop typing when we reach the end of the text
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 100);  // Typing speed in milliseconds

    // Cleanup the interval when the component unmounts or re-renders
    return () => clearInterval(interval);
  }, [question]);  

  var fetchQuestion = ()=> {
  fetch(`http://localhost:8080/api/questions/${questionId}`)
  .then(res=> res.json())
  .then(data=> {
   setQuestion(data)
  // animateQues()
   console.log("the userid is: " +data.userProfile?.id )
 })

 }

 var fetchUserProfileName = ()=>{
  console.log("question is: "  + JSON.stringify(question.userProfile?.id))
  fetch(`http://localhost:8080/api/user-profiles/${question.userProfile?.id}`)
  .then(response=>response.json())
  .then(data=> {
    setUserProfileName(data.name)
   })
}





    return(
      
      
      <CenterPageDiv>

      
      {
        question && (
          <>
          <H1HeaderTag style={{"border-bottom": "1px solid #777", "padding-bottom": "30px", "margin-bottom": "30px", color:" #F8F7E5"}}>{question.title}</H1HeaderTag>
          <BodyTag>
            
        <VotingButtons likeCount={question.liked ? question.liked : 0} questionId={questionId}/>
          <div style={{fontSize: '17px'}} >
           <div  className="typewriter-text">{displayedText}</div>
          <ReactMarkdown  remarkPlugins={[gfm]} children={question.question} />
          <AnswerMeta>
            <div>
            
            {question.tags.map(tag=> <Link to={`/tagquestions/${tag.id}`}><span className="tag">{tag.tagName} </span></Link> )} 
            </div>
       <WhoAndWhen>  <User id={question.userProfile?.id} >Asked By: { userProfileName ? userProfileName : "Anonymous User"}, {question.createdDate} </User> </WhoAndWhen>  
       {/* <User>{question.userProfile?.id} <WhoAndWhen>asked {question.createdDate}</WhoAndWhen></User> */}
            </AnswerMeta> 
          </div>



        </BodyTag>
          <AllAnswersListPage 
          questionId={questionId}
          />



        <H2HeaderTag>Your Answer</H2HeaderTag>
        
         <PostBodyTextArea
         questionId={questionId}
         />
         
      
          </>
        )
      }
     
      </CenterPageDiv>
     
    )
}

export default AnswersPage;