
import styled from "styled-components"
import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PreviewArea from "./styled-components/PreviewArea";
import UserLink from "./UserLink";
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
  const {currentLoggedInUser} = useUser();
 
 
  const fetchQuestion = ()=> {
  fetch(`http://localhost:8080/api/questions/${questionId}`)
  .then(res=> res.json())
  .then(data=> {
   setQuestion(data)
 })
 }

const CenterPageDiv = styled.div`
padding: 30px 28px;
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



  useEffect(()=>{
    fetchQuestion();
  }, [])

    return(
      
      
      <CenterPageDiv>

      
      {
        question && (
          <>
          <H1HeaderTag style={{"border-bottom": "1px solid #777", "padding-bottom": "30px", "margin-bottom": "30px"}}>{question.title}</H1HeaderTag>
          <BodyTag>
        <VotingButtons/>
          <div style={{fontSize: '17px'}} >
           
          <ReactMarkdown remarkPlugins={[gfm]} children={question.question} />
          <AnswerMeta>
            <div>
            
            {question.tags.map(tag=> <span className="tag">{tag.tagName}</span>)} 
            </div>
       <WhoAndWhen> {question.createdDate} <UserLink id={question.userProfile?.id} > { "user Profile Id: " + question.userProfile?.id} </UserLink> </WhoAndWhen>  
         
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