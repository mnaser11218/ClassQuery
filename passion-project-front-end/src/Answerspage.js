
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

function AnswersPage(){
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion]= useState("")
 
 
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
border: 1px solid white;
border-radius: 5px;
`
const BodyTag = styled.div`
display: grid;
grid-template-columns: 50px 1fr;
border: 1px solid white;
border-radius: 5px;
`



  useEffect(()=>{
    fetchQuestion();
  }, [])

    return(
      
      
      <CenterPageDiv>
      <h1>QUESTION NUM: {questionId}</h1>

      
      {
        question && (
          <>Title: 
          <H1HeaderTag>{question.title}</H1HeaderTag>
          <BodyTag>
        <div>voting</div>
          <div>
            Question:
          <ReactMarkdown remarkPlugins={[gfm]} children={question.question} />
          <AnswerMeta>
            <div>
            {question.tags.map(tag=> <span className="tag">{tag.tagName}</span>)} 
            </div>
       <WhoAndWhen> time ago : {question.createdDate} <UserLink id={question.userProfile.id} > { "user Profile Id: " + question.userProfile.id} </UserLink> </WhoAndWhen>  
         
            </AnswerMeta> 
          </div>



        </BodyTag>
        
         
        

       
          </>
        )
      }
     
      </CenterPageDiv>
     
    )
}

export default AnswersPage;