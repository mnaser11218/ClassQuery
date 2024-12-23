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
    <StyledQuestionRow>
       
    <QuestionStat>{liked}<span>Votes</span></QuestionStat>
    <QuestionStat> <GetAmountOfAnswers questionId={id} /> <span>Answers</span></QuestionStat>
    <QuestionTitleArea>
        <QuestionLink to={`/answerspage/${id}`} >{title}</QuestionLink>
        <QuestionTag>{question} </QuestionTag>


        <User>{userProfileName ? userProfileName : "Anonymous User" } <WhoAndWhen>asked {createdDate}</WhoAndWhen></User>

        {tags!= null && tags.map(tag=> <span className="tag">{tag.tagName}</span>)}
        
        {/* <Tag>Spring</Tag>
        <Tag>MySql</Tag>
         */}
    </QuestionTitleArea>
    </StyledQuestionRow>
            </>
    )
}
export default QuestionRow;
