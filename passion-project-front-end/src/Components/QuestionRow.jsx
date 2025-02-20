import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom"
import GetAmountOfAnswers from './GetAmountOfAnswers';
import { useEffect, useState } from "react";


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

const QuestionLink = styled(Link)`
text-decoration: none;
//color: rgb(27, 117, 208);
//color: hsl(210,89%,77%);
//color: #874F41;
color:  hsl(210,77%,46%);
cursor: pointer;
font-size: 1.2rem;
//font-family: var(--theme-post-title-font-family, var(--theme-body-font-family));
font-family: var(--ff-sans);
font-weight: 500;
display:block;
margin-bottom: 10px;
&:hover{
text-decoration: underline}
`

const StyledQuestionRow = styled.div`
// background-color: rgba(255,255,255,.1);
 //background: #808080;
padding: 10px 15px 10px;
display: grid;
grid-template-columns:  100px 100px 1fr;
//border-top: solid 1px #777;
// border-top: solid 1px #F8F7E5;
border-top: solid 1px #F8F7E5;

   opacity: 0;
  transform: translateY(50px);
  animation: fadeInSlideUp 2s ease-out forwards;


@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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

const QuestionTag = styled.div`
color: var(--theme-link-color, var(--theme-secondary-400));
letter-spacing: 0.5px;
line-height: 1.5;
display: block;
margin: 5px;
padding:10px;
`

function QuestionRow(props){
const {question, title, createdDate, tags, id, liked, userProfileId} = props;
const [userProfileName, setUserProfileName] = useState("")
// let navigate = useNavigate(); 
//     const routeChange = ()=> {
//         let path = `/answerspage`; 
//         navigate(path);
//     }

const fetchUserProfileName = ()=>{
        fetch(`http://localhost:8080/api/user-profiles/${userProfileId}`)
        .then(response=>response.json())
        .then(data=> setUserProfileName(data.name) )
      }
      useEffect(()=>{

        if(userProfileId){
                fetchUserProfileName()
        }

      },[])
    return(
            <>
    <StyledQuestionRow  data-test="question-row">
       
    <QuestionStat data-test="questionRow-votes">{liked}<span>Votes</span></QuestionStat>
    <QuestionStat> <GetAmountOfAnswers questionId={id} /> <span>Answers</span></QuestionStat>
    <QuestionTitleArea>
        <QuestionLink data-test="questionRow-title" to={`/answerspage/${id}`} >{title}</QuestionLink>
        <QuestionTag data-test="questionRow-question">{question} </QuestionTag>


        <User data-test="userProfileName-questionrow">{userProfileName ? userProfileName : "Anonymous User" } <WhoAndWhen>asked {createdDate}</WhoAndWhen></User>

        {tags!= null && tags.map(tag=> <Link data-test="questionRow-tag" to={`/tagquestions/${tag.id}`}> <span className="tag">{tag.tagName}</span> </Link>)}
        
        {/* <Tag>Spring</Tag>
        <Tag>MySql</Tag>
         */}
    </QuestionTitleArea>
    </StyledQuestionRow>
            </>
    )
}
export default QuestionRow;
