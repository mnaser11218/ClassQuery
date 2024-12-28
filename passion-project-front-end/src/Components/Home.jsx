import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../CurrentUser";
import BlueButton from "../styled-components/BlueButton";
const H1home = styled.div`
color:black;
font-size: 5rem;
margin-bottom: 500px;
border: solid 2px white;
`

const DivEle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  padding: 10px;
`
const LinkTag =styled(Link)`

border-radius: 5px;
display: inline-block;
margin:auto;
color:  #F8F7E5;
font-weight: 400;
text-decoration: none;
padding: 5px;
`
const Description = styled.p`
font-size: 15px;
padding: 10px;

`
const AssignmentEle = styled.div`
border: solid 2px gray;
padding: 10px 0;
font-size: 30px;
width: 100%;
height: 250px;
border-radius: 10px;
`

const StyledHeader = styled.a`
color: #F8F7E5;
font-size: 2rem;
font-family: var(--ff-sans);
cursor: pointer;
`
const HeaderRow = styled.div`
padding: 30px 20px;
display: grid;
grid-template-columns: 1fr max-content
`
function Home(){
  const [assignments, setAssignments]=useState([])
  const { currentLoggedInUser } = useUser()
  let navigate = useNavigate(); 
  const routeChange = ()=> {
      let path = `/addassignment`; 
      navigate(path);
  }

  useEffect(()=>{
  fetch("http://localhost:8080/api/assignments")
  .then(response=> response.json())
  .then(assign=> setAssignments(assign))
  },[])
return(
    <>
        <HeaderRow>
<StyledHeader> Course Assignments </StyledHeader>
<BlueButton onClick={routeChange}>Add&nbsp;Assignment</BlueButton>  
</HeaderRow>
<div style={{margin: "30px"}}>
An assignment is a task assigned by a teacher in a course, where students can ask and answer questions related to the material.</div>
    <DivEle div-cypress="assignment">
    
    {assignments?.map(ele=>{
      return(
      <AssignmentEle >
     
        <LinkTag to={`/assignmentquestion/${ele.id}`}>
        <span className="tag">{ele.name}</span> 
         </LinkTag>
        <Description>{ele.courseName}</Description>
    
      </AssignmentEle>

    )}
      )} 
    </DivEle>
    
    </>
)
}
export default Home;