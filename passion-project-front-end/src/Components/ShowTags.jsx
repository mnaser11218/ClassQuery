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
// color: black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
  overflow: hidden;

  // overflow: auto;
   //height: 1000px; 
`
const Description = styled.p`
font-size: 15px;
padding: 10px;

`

const LinkTag =styled(Link)`

border-radius: 5px;
display: inline-block;
margin:auto;
color:  #F8F7E5;
      font-weight: 400;
    //   font-size: 1.5rem;
text-decoration: none;
// background-color:white;
padding: 5px;
// margin-bottom: 30px;

`

const AssignmentEle = styled.div`
border: solid 2px gray;
//  background-color: white;
  //text-align: center;
  padding: 10px 0;
  font-size: 30px;
width: 100%;
height: 250px;
  overflow: hidden;
 border-radius: 10px;

  opacity: 0;
  transform: translateY(50px);
  animation: fadeInSlideUp 2s ease-out forwards;


@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  
`

const StyledHeader = styled.a`
// color: #F8F7E5;
font-size: 2rem;
font-family: var(--ff-sans);
cursor: pointer;
`
const HeaderRow = styled.div`
padding: 30px 20px;
//background-color: gray;
display: grid;
grid-template-columns: 1fr max-content
`
function ShowTags(){
  const [assignments, setAssignments]=useState([])
  const { currentLoggedInUser } = useUser()
  let navigate = useNavigate(); 
  const routeChange = ()=> {
      let path = `/addtag`; 
      navigate(path);
  }

  useEffect(()=>{
  fetch("http://localhost:8080/api/tags")
  .then(response=> response.json())
  .then(assign=> setAssignments(assign))
  },[])
return(
    <>
        <HeaderRow>
<StyledHeader data-test="tags-header"> Tags </StyledHeader>
<BlueButton data-test="tags-addtag-button" onClick={routeChange}>Add&nbsp;Tag</BlueButton>  
</HeaderRow>
<div  data-test="tags-header-description" style={{margin: "30px"}}>
A tag is a keyword or label that groups your question with other related questions. Using appropriate tags helps others find and respond to your question more easily.</div>

    <DivEle>
    
    {assignments?.map(ele=>{
      return(
      <AssignmentEle data-test="tags-individual-tag" >
        <LinkTag data-test="tags-individual-tag-name" to={`/tagquestions/${ele.id}`}>
        <span className="tag">{ele.tagName}</span>
        </LinkTag>

        <Description data-test="tags-individual-tag-description">{ele.tagDescription}</Description>
         
    
      </AssignmentEle>

    )}
      )} 
    </DivEle>
    
    </>
)
}

export default ShowTags