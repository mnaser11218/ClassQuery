import styled from "styled-components"
import { useNavigate } from "react-router-dom";


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
// background-color: rgba(255,255,255,.1);
background: #808080;
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

const QuestionTag = styled.div`

display: block;
margin: 5px;
padding:10px;
`

function QuestionRow(props){
const {question, title, createdDate, tags, id} = props;
// let navigate = useNavigate(); 
//     const routeChange = ()=> {
//         let path = `/answerspage`; 
//         navigate(path);
//     }
    return(
            <>
    <StyledQuestionRow>
    <QuestionStat>0<span>Votes</span></QuestionStat>
    <QuestionStat>0<span>Answers</span></QuestionStat>
    <QuestionTitleArea>
        <QuestionLink href="/answerspage" >{title}</QuestionLink>
        <QuestionTag>{question} </QuestionTag>


        <User>Mohammed <WhoAndWhen>asked {createdDate}</WhoAndWhen></User>

        {tags!= null && tags.map(tag=> <Tag>{tag.tagName}</Tag>)}
        
        {/* <Tag>Spring</Tag>
        <Tag>MySql</Tag>
         */}
    </QuestionTitleArea>
    </StyledQuestionRow>
            </>
    )
}
export default QuestionRow;
