import styled from "styled-components";
const ArrowUp = styled.div`
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #f9af42;
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
    border-top: 20px solid #f9af42;
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
background-color:rgb(117, 132, 106);

 border: 0;
  cursor: pointer;
  text-align: center;
`

const Total = styled.div`
text-align: center;
width: 50px;
font-size: 1.4rem;
padding: 15px 0;
color: #888;
line-height: 1.4rem;
`
function VotingButtons(props){
    return (<div {...props}>
	{/* &#x20B2; */}
      <Button> <ArrowUp/> </Button>
     
            <Total> {6}</Total>
            {/* &#x20BC; */}
       <Button> <ArrowDown/> </Button>
   

    </div>)
}
export default VotingButtons;