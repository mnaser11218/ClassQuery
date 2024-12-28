import React from 'react'
import { useState, useEffect } from 'react';
import { useUser } from '../CurrentUser';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionRow from './QuestionRow';
import BlueButton from '../styled-components/BlueButton';
import styled from 'styled-components';

const StyledHeader = styled.a`
color: #F8F7E5;
font-size: 1.8rem;
font-family: var(--ff-sans);
cursor: pointer;
`
const HeaderRow = styled.div`
padding: 30px 20px;
//background-color: gray;
display: grid;
grid-template-columns: 1fr max-content;
margin-top: 0px;
`
function AssignmentQuestions() {
    const { currentLoggedInUser } = useUser()
    let navigate = useNavigate(); 
    const routeChange = ()=> {
        let path = `/askpage/${assignmentId}`; 
        navigate(path);
    }
    const [questions, setQuestions]=useState([])
    const [assignmentName, setAssignmentName] = useState("")
    const params = useParams();
    const assignmentId = params.id;
useEffect(()=>{
    fetch(`http://localhost:8080/api/questions/assignment/${assignmentId}`)
    .then(res=>res.json())
    .then(data=> setQuestions(data))

    fetch("http://localhost:8080/api/assignments/"+assignmentId)
    .then(res=> res.json())
    .then(data=> setAssignmentName(data.name))
}, [])
 


return(
    <>
        <HeaderRow>
<StyledHeader>Questions for Assignment: {assignmentName}</StyledHeader>
 <BlueButton onClick={routeChange}>Ask&nbsp;Question</BlueButton>
</HeaderRow>

<div style={{"margin": "15px", "margin-left": "25px"}}>{questions.length} Questions</div>
{ questions.length >0 ?  questions.map(row=> {
console.log("inside row")
return <QuestionRow question={row.question} title={row.title} createdDate={row.createdDate} tags={row.tags} id={row.id} liked={row.liked ? row.liked: 0} userProfileId={row?.userProfile?.id} />
}) : <div style={{"border": "solid 1px", "padding": "20px"}}>This Assignment Has No Questions, yet.</div>}

    </>
)

}

export default AssignmentQuestions