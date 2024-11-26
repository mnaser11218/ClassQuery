import styled from "styled-components"
import { useState, useEffect } from "react";
function GetAmountOfAnswers({...props}){

    const [answers, setAnswers ] = useState([]);
    const getAnswers = ()=>{
        fetch(`http://localhost:8080/api/answers/question/${questionId}`)
        .then(res=> res.json())
        .then(data=> setAnswers(data))
    }
   
    useEffect(()=>{
    getAnswers();
    },[])

const {questionId} = props;
return (<div>{answers.length}</div>)
}
export default GetAmountOfAnswers;