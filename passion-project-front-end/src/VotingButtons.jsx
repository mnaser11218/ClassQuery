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
  const {answerId, questionId} = props;
  const handleLikeButton = ()=>{
    console.log("clicked like button")
  }
  const handleDislikeButton = ()=>{
    const variable = (answerId ? answerId : questionId)
    console.log("clicked dislike button" + variable)
  }
    return (<div {...props}>
	{/* &#x20B2; */}
      <Button onClick={handleLikeButton}> <ArrowUp/> </Button>
            <Total> {0}</Total>
            {/* &#x20BC; */}
       <Button onClick={handleDislikeButton}> <ArrowDown/> </Button>
   

    </div>)
}
export default VotingButtons;