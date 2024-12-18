import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const H1home = styled.div`
color:black;
font-size: 5rem;
margin-bottom: 500px;
border: solid 2px white;
`

const DivEle = styled.div`
color: black;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 15px;
  padding: 10px;
  height: 300px;
 
`
const LinkTag =styled(Link)`
border: black 1px solid;
border-radius: 5px;
display: inline-block;
margin:auto;
font-size: 20px;
color:black;
text-decoration: none;

`

const AssignmentEle = styled.div`
border: solid 2px gray;
 background-color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
width: 100%;
height: 400px;
 border-radius: 10px;
  //background-image: url("https://st3.depositphotos.com/7865540/12756/i/450/depositphotos_127563976-stock-photo-notepad-with-text-in-frame.jpg")
`
function Home(){
  const [assignments, setAssignments]=useState([])

  useEffect(()=>{
  fetch("http://localhost:8080/api/assignments")
  .then(response=> response.json())
  .then(assign=> setAssignments(assign))
  },[])
return(
    <>
    <DivEle>
    {assignments?.map(ele=>{
      return(
      <AssignmentEle>
        <LinkTag to={`/assignmentquestion/${ele.id}`}>
        {ele.name}
        </LinkTag>
         
    
      </AssignmentEle>

    )}
      )} 
    </DivEle>
    
    </>
)
}
export default Home;