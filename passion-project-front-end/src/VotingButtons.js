import styled from "styled-components";
const ArrowUp = styled.div`
    width: 0; 
    height: 0; 
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 25px solid #888;
      text-align: center;

  `
  
  const ArrowDown = styled.div`
    width: 0; 
    height: 0; 
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 25px solid #888;
    padding: 0;
      text-align: center;

  `
const Button = styled.button`
font-size: 2rem;
color: #888;
background-color:#2d2d2d;
 border: 0;
  cursor: pointer;
  text-align: center;
`

const Total = styled.div`
text-align: center;
width: 55px;
font-size: 1.4rem;
padding: 15px 0;
`
function VotingButtons(){
    return (<div>
	{/* &#x25B2; */}
      <Button> <ArrowUp/> </Button>
     
            <Total> {6}</Total>
            {/* &#x25BC; */}
       <Button> <ArrowDown/> </Button>
   

    </div>)
}
export default VotingButtons;