import styled from "styled-components";
import { useEffect, useState } from "react";
import VotingButtons from "./VotingButtons";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import H1HeaderTag from "./styled-components/H1HeaderTag";
import H2HeaderTag from "./styled-components/H2HeaderTag";

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
function AllAnswersListPage({...props}){
    const {questionId} = props;
    const [answers, setAnswers ] = useState([]);
    const getAnswers = ()=>{
        fetch(`http://localhost:8080/api/answers/question/${questionId}`)
        .then(res=> res.json())
        .then(data=> setAnswers(data))
    }
   
    useEffect(()=>{
    getAnswers();
    },[])

    return (<>
   <H2HeaderTag style={{"border-top": "none"}}> {answers.length} Answers:</H2HeaderTag>
    {answers.map(answer=> {
        return (
         <BodyTag>

         <VotingButtons/>
        
               <div>
            
               <ReactMarkdown remarkPlugins={[gfm]} children={answer.answer} />
               </div>
            </BodyTag>
        )
    })}
   
    </>)
}
export default AllAnswersListPage;