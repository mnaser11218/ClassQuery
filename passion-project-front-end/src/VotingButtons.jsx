import { useEffect, useState } from "react";
import styled from "styled-components";
const ArrowUp = styled.div`
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid hsl(27, 89%, 48%);
      text-align: center;
      &:hover{
      border-bottom: 20px solid #FF9900;
      }

  `
  
  const ArrowDown = styled.div`
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid hsl(27, 89%, 48%);
    padding: 0;
    text-align: center;
      &:hover{
    border-top: 20px solid #FF9900;
      }

  `
const Button = styled.button`
font-size: 2rem;
color: #888;

//background-color:#2d2d2d;
//background-color: #244855;
background-color:#2d2d2d;

 border: 0;
  cursor: pointer;
  text-align: center;
`

const Total = styled.div`
text-align: center;
width: 50px;
font-size: 1.4rem;
padding: 15px 0;
color: #F8F7E5;
line-height: 1.4rem;
`
function VotingButtons(props){

  const {answerId, questionId, likeCount} = props;
  const [likedCount, setLikedCount] = useState(likeCount)
  const [liked, setLiked] = useState(false)
 

const updateAnswerCount = (updatedLikedValue) =>{
  fetch(`http://localhost:8080/api/answers/like/${answerId}`, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
        liked: updatedLikedValue
      })
  })
    .then(res => {
      setLikedCount(updatedLikedValue)
      setLiked(true)
      
    })
}

const updateQuestionCount = (updatedQuesCount) =>{
  fetch(`http://localhost:8080/api/questions/like/${questionId}`, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
        liked: updatedQuesCount
      })
  })
    .then(res => {
      setLikedCount(updatedQuesCount)
      setLiked(true)
      
    })


}

  const handleLikeButton = ()=>{
      if(answerId != null){
    let updatedLikedValue = likedCount + 1;
    updateAnswerCount(updatedLikedValue)
  } else{
      let updatedQuesCount = likedCount + 1;
      updateQuestionCount(updatedQuesCount)
  }
  }



  const handleDislikeButton = ()=>{
    const variable = (answerId ? answerId : questionId)
    if(answerId != null){
      let updatedLikedValue = likedCount - 1;
      updateAnswerCount(updatedLikedValue)
    } else{
      let updatedQuesCount = likedCount - 1;
      updateQuestionCount(updatedQuesCount)
    }
  }
    return (<div {...props}>
	{/* &#x20B2; */}
      <Button onClick={handleLikeButton}> <ArrowUp/> </Button>
           
           <Total>{likedCount}</Total>  
            {/* &#x20BC; */}
       <Button onClick={handleDislikeButton}> <ArrowDown/> </Button>
   

    </div>)
}
export default VotingButtons;