import styled from "styled-components"
import { useState, useEffect } from "react";
function GetAmountOfAnswers({...props}){

    const [answerCount, setAnswerCount ] = useState();
    const getAnswers = ()=>{
        fetch(`http://localhost:8080/api/answers/count/${questionId}`)
        .then(res=> res.json())
        .then(data=> setAnswerCount(data))
    }
   
    useEffect(()=>{
    getAnswers();
    },[])

const {questionId} = props;
return (<div>{answerCount}</div>)
}
export default GetAmountOfAnswers;