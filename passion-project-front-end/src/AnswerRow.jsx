import React from 'react'
import styled from 'styled-components';
import VotingButtons from './VotingButtons';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const BodyTag = styled.div`
display: grid;
grid-template-columns: 50px 1fr;
border-radius: 5px;
column-gap: 40px;
border-top: 1px solid #777;
padding-top: 30px;
margin-top:30px;
padding-left: 100px;
`
function AnswerRow(props) {
    const {answer} = props;
  return (
    <BodyTag>
           
         <VotingButtons likeCount={answer.liked ? answer.liked : 0} answerId={answer.id}/>
        
               <div  style={{fontSize: '17px',  "letter-spacing": "1px" }} >
            
               <ReactMarkdown
                remarkPlugins={[gfm]} 
                children={answer.answer}    
               />
              
               <p style={{color: "gray", fontSize:"10px" }}>answered By:, {answer.createdDate}</p>
               </div>
            </BodyTag>
  )
}

export default AnswerRow