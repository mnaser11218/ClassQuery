import styled from "styled-components";
const H1home = styled.div`
color:black;
font-size: 5rem;
margin-bottom: 500px;
border: solid 2px white;
`

const DivEle = styled.div`
color: black;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
  height: 500px;
`

const AssignmentEle = styled.div`
border: solid 2px gray;
 background-color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
width: 100%;
height: 400px;
  //background-image: url("https://st3.depositphotos.com/7865540/12756/i/450/depositphotos_127563976-stock-photo-notepad-with-text-in-frame.jpg")
`
function Home(){
return(
    <>
    <DivEle>
    <AssignmentEle>testing</AssignmentEle>
    <AssignmentEle>testing</AssignmentEle>
    <AssignmentEle>testing</AssignmentEle>
    <AssignmentEle>testing</AssignmentEle>
    {/* <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/> */}
    </DivEle>
    
    </>
)
}
export default Home;