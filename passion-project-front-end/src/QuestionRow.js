import styled from "styled-components"

const QuestionStat = styled.div`
margin-top:15px;
text-align: center;
font-size: 1.2rem;
span{
font-size: .7rem;
display:block;
margin-top: 10px
}
`
const QuestionTitleArea = styled.div`
padding: 0 30px;
`

const QuestionLink = styled.a`
text-decoration: none;
color: rgb(27, 117, 208);
cursor: pointer;
font-size: 1.1rem;
font-family: sans-serif;
font-weight: bold;
display:block;
margin-bottom: 10px;
`

const Tag = styled.span`
display: inline-block;
margin-right: 3px;
border: solid white;
padding: 7px;
margin: 7px;
border-radius: 5px;
cursor: pointer;
font-size: 0.9rem;
`
const StyledQuestionRow = styled.div`
background-color: rgba(255,255,255,.1);
padding: 10px 15px 10px;
display: grid;
grid-template-columns:  100px 100px 1fr;
border-top: solid 1px #777;
`
const WhoAndWhen = styled.div`
display: inline-block;
font-size: 0.7rem;
color: #D3D3D3;
`

const User = styled.a`
color: rgb(27, 117, 208);
font-size: 0.7rem;
float: right;
padding: 10px 0;
`
const runfetch = () => {

    // {
    //     method: 'GET',
    //     headers: {
    //       Authorization: 'Bearer ' + `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDY4MDQwMCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NTk0MDAwfQ.7-XRt5cho__tX8MnnZeGSkPlDoXo1aVLwF85PszxktzIJZxgd9rlTmWCLZRZAHksh6_RFYNqiL--oNMPlomSsg`
    //     }}
    const API_URL = `http://localhost:8080`;
  fetch(`http://localhost:8080/api/questions?eagerload=true`)
    .then(res => {
      console.log("inside fetch method")
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      console.log("data fetched")
      console.log(data)
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
     // document.getElementById('posts').innerHTML = 'Error Loading Data';
    });
  }

function QuestionRow(props){
const {question} = props;
function handleQuestions(event){
    event.preventDefault()
    console.log("called handle questions method")
    runfetch();
}
    return(
            <>
    <StyledQuestionRow>
    <QuestionStat>0<span>Votes</span></QuestionStat>
    <QuestionStat>0<span>Answers</span></QuestionStat>
    <QuestionTitleArea>
        <QuestionLink href="" onClick={handleQuestions}>{question}</QuestionLink>
        <User>Mohammed <WhoAndWhen>asked 5/3/2004</WhoAndWhen></User>
        <Tag>Java</Tag>
        <Tag>Spring</Tag>
        <Tag>MySql</Tag>
        
    </QuestionTitleArea>
    </StyledQuestionRow>
            </>
    )
}
export default QuestionRow;