import styled from "styled-components";
const TitleInput = styled.input`
width: 100%;
height: 30px;
margin-bottom: 10px;
margin-top: 30px;
border: solid 2px black;
border-radius: 5px;
color: black;
`

const TextAreaTag = styled.textarea`
width: 100%;
height: 100%;
padding: 10px;
border: solid 2px black;
border-radius: 5px;

`
const H1Tag = styled.h1`
color: black;
font-size: 1.5rem;
font-family: arial;
`



const CenterPageDiv = styled.div`
position: absolute;
  width: 400px;
  height: 300px;
  z-index: 15;
  top: 40%;
  left: 50%;
  margin: -100px 0 0 -150px;
`
function AskPage(){
return(
    <>
    <CenterPageDiv>
        <H1Tag>Ask A Question</H1Tag>
    <TitleInput placeholder="Title of your Question"></TitleInput>
    <TextAreaTag placeholder="Enter Question here"></TextAreaTag>

    </CenterPageDiv>
    </>
)
}

export default AskPage;