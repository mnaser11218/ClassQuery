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
border: solid 2px white;
 background-color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
width: 100%;
height: 400px;
  background-image: url("https://assets-global.website-files.com/5dbb30f00775d4350591a4e5/6335d12aa8bba4d2c450c8d7_react%20js%20introduction%20microverse%20(2).webp")
`
function Home(){
return(
    <>
    <DivEle>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>
    <AssignmentEle/>

    </DivEle>
    
    </>
)
}
export default Home;