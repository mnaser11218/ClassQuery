
import styled from "styled-components"
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionRow from "./QuestionRow";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import PreviewArea from "./styled-components/PreviewArea";

function AnswersPage(){
  const params = useParams();
  const questionId = params.id;
  const [question, setQuestion]= useState("")
//  const fetchQuestion = ()=> {
//     fetch(`http://localhost:8080/api/questions/${questionId}`)
//     .then(res=> res.json())
//     .then(data=> console.log(data))
//   }

const CenterPageDiv = styled.div`
padding: 30px 28px;
`


  useEffect(()=>{
   // fetchQuestion();s
   fetch(`http://localhost:8080/api/questions/${questionId}`)
   .then(res=> res.json())
   .then(data=> {
    console.log(data)
    setQuestion(data)
  })
  }, [])

    return(
      
      
      <CenterPageDiv>
      <h1>ANSWERS PAGE FOR QUESTION NUM: {questionId}</h1>
      {/* <QuestionRow question={question.question} title={question.title} createdDate ={question.createdDate} tags={question.tags} id={questionId}></QuestionRow> */}
      {
        question && (
          <>
          <H1HeaderTag>{question.title}</H1HeaderTag>
          <PreviewArea>
          <ReactMarkdown remarkPlugins={[gfm]} children={question.question}/>
          </PreviewArea>
       
          </>
        )
      }
      </CenterPageDiv>
     
    )
}

export default AnswersPage;