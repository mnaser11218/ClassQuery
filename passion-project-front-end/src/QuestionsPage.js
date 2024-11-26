import { useEffect, useState } from 'react';
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import QuestionRow from "./QuestionRow"
const StyledHeader = styled.a`
color: white;
font-size: 1.8rem;
font-family: var(--ff-sans);
cursor: pointer;
`
const HeaderRow = styled.div`
padding: 30px 20px;
display: grid;
grid-template-columns: 1fr min-content
`
const BlueButton = styled.button`
background-color: rgb(27, 117, 208);
color: white;
padding: 15px;
border-radius: 5px;
border: 0;
cursor: pointer;
`  

function QuestionsPage(){   
    const [questions, setQuestions] = useState([])
    let navigate = useNavigate(); 
    const routeChange = ()=> {
        let path = `/askpage`; 
        navigate(path);
    }
    useEffect(()=> {
        fetch(`http://localhost:8080/api/questions?eagerload=true`)
        .then(res => {
          console.log("inside fetch method")
          //console.log("res is ", Object.prototype.toString.call(res));
          return res.json();
        })
        .then(data => {
          console.log("data fetched")
          console.log(data)
          setQuestions(data);
          //arr = data;
        })
        .catch(error => {
          console.log(`Error Fetching data : ${error}`);
         // document.getElementById('posts').innerHTML = 'Error Loading Data';
        });
    }, [])
 
   // handleQuestions();
    return(
        <main>
            <HeaderRow>
<StyledHeader>All Questions</StyledHeader>
<BlueButton onClick={routeChange}>Ask&nbsp;Question</BlueButton>
</HeaderRow>
{questions.map(row=> {
    console.log("inside row")
   return <QuestionRow question={row.question} title={row.title} createdDate={row.createdDate} tags={row.tags} id={row.id}/>
})}

        </main>
    )

}

export default QuestionsPage;