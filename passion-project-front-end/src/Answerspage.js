
import styled from "styled-components"
import {Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PreviewArea from "./styled-components/PreviewArea";
import UserLink from "./UserLink";
import WhoAndWhen from "./WhoAndWhen";

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
grid-template-columns: 1fr min-content;
border: 1px solid white;
border-radius: 5px;
`



  useEffect(()=>{
    fetchQuestion();
  }, [])

    return(
      
      
      <CenterPageDiv>
      <h1>ANSWERS PAGE FOR QUESTION NUM: {questionId}</h1>
      {/* <QuestionRow question={question.question} title={question.title} createdDate ={question.createdDate} tags={question.tags} id={questionId}></QuestionRow> */}
      {
        question && (
          <>
          Title: 
          <H1HeaderTag>{question.title}</H1HeaderTag>
          Question: 
          <H1HeaderTag>{question.question}</H1HeaderTag>
          <AnswerMeta>
            <div>
            {question.tags.map(tag=> <span className="tag">{tag.tagName}</span>)} 
            </div>
          
       <WhoAndWhen> time ago : {question.createdDate} <UserLink > {question.userProfile ? question.userProfile :"UserProfile"} </UserLink> </WhoAndWhen>  
         
            </AnswerMeta> 
        

       
          </>
        )
      }
      </CenterPageDiv>
     
    )
}

export default AnswersPage;