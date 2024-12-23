
import styled from "styled-components"
import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PreviewArea from "./styled-components/PreviewArea";
import UserLink from "./styled-components/UserLink";
import WhoAndWhen from "./styled-components/WhoAndWhen";
import VotingButtons from "./VotingButtons";
import H2HeaderTag from "./styled-components/H2HeaderTag";
import PostBodyTextArea from "./PostBodyTextArea";
import AllAnswersListPage from "./AllAnswersListPage";
import { useUser } from "./CurrentUser";

function AnswersPage(){
  
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion]= useState("")
  const [userProfileName, setUserProfileName] =useState("")
  const {currentLoggedInUser} = useUser();
 
  useEffect(()=>{
    fetchQuestion();
  }, [])
  useEffect(()=>{
    if(question){
      fetchUserProfileName()
    }
   
  },[question])
 
  var fetchQuestion = ()=> {
  fetch(`http://localhost:8080/api/questions/${questionId}`)
  .then(res=> res.json())
  .then(data=> {
   setQuestion(data)
   console.log("the userid is: " +data.userProfile?.id )
 })

 }

 var fetchUserProfileName = ()=>{
  console.log("question is: "  + JSON.stringify(question.userProfile.id))
  fetch(`http://localhost:8080/api/user-profiles/${question.userProfile.id}`)
  .then(response=>response.json())
  .then(data=> {
    setUserProfileName(data.name)
    
   } )
}

 

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





    return(
      
      
      <CenterPageDiv>

      
      {
        question && (
          <>
          <H1HeaderTag style={{"border-bottom": "1px solid #777", "padding-bottom": "30px", "margin-bottom": "30px"}}>{question.title}</H1HeaderTag>
          <BodyTag>
            
        <VotingButtons likeCount={question.liked ? question.liked : 0} questionId={questionId}/>
          <div style={{fontSize: '17px'}} >
           
          <ReactMarkdown remarkPlugins={[gfm]} children={question.question} />
          <AnswerMeta>
            <div>
            
            {question.tags.map(tag=> <span className="tag">{tag.tagName}</span>)} 
            </div>
       <WhoAndWhen>  <User id={question.userProfile?.id} >Asked By: { userProfileName}, {question.createdDate} </User> </WhoAndWhen>  
       {/* <User>{question.userProfile?.id} <WhoAndWhen>asked {question.createdDate}</WhoAndWhen></User> */}
            </AnswerMeta> 
          </div>



        </BodyTag>
          <AllAnswersListPage 
          questionId={questionId}
          />

{ currentLoggedInUser?.id ? (
  <>
        <H2HeaderTag>Your Answer</H2HeaderTag>
        
         <PostBodyTextArea
         questionId={questionId}
         />
         </>
)
         : "Log in to submit an answer"
}
      
          </>
        )
      }
     
      </CenterPageDiv>
     
    )
}

export default AnswersPage;