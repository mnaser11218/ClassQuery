
import styled from "styled-components"
import {useParams} from "react-router-dom";

function AnswersPage(){
  const params = useParams();
  const questionId = params.id;

    return(
      
      <><h1>{console.log(questionId)}</h1></>
    )
}

export default AnswersPage;