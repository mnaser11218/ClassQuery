import styled from "styled-components";
import { useEffect, useState } from "react";
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
    <div>{answers.map(answer=> <div>

        {answer.answer}
    </div>)}</div>
    </>)
}
export default AllAnswersListPage;