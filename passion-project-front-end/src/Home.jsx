import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./CurrentUser";
import BlueButton from "./styled-components/BlueButton";
const H1home = styled.div`
color:black;
font-size: 5rem;
margin-bottom: 500px;
border: solid 2px white;
`

const DivEle = styled.div`
color: black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  padding: 10px;

  // overflow: auto;
   //height: 1000px;
 
`
const LinkTag =styled(Link)`

border-radius: 5px;
display: inline-block;
margin:auto;

      font-weight: 600;
      font-size: 1.5rem;
      color: #34495e;
text-decoration: none;
background-color:white;
padding: 5px;
// margin-bottom: 30px;

`

const AssignmentEle = styled.div`
border: solid 2px gray;
 background-color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
width: 100%;
height: 250px;
 border-radius: 10px;
  //background-image: url("https://st3.depositphotos.com/7865540/12756/i/450/depositphotos_127563976-stock-photo-notepad-with-text-in-frame.jpg")
`

const StyledHeader = styled.a`
color: #F8F7E5;
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

    <DivEle>
    
    {assignments?.map(ele=>{
      return(
      <AssignmentEle style={{"backgroundImage": `url(https://www.shutterstock.com/image-illustration/assignment-technical-squares-600nw-702799699.jpg)`,   backgroundRepeat: "no-repeat",
      // Optional: Makes sure the image covers the element
      backgroundPosition: "center"}}>
        <LinkTag to={`/assignmentquestion/${ele.id}`}>
        {<br></br>} {ele.name}
        </LinkTag>
         
    
      </AssignmentEle>

    )}
      )} 
    </DivEle>
    
    </>
)
}
export default Home;