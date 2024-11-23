import styled from "styled-components";
const StyledWhoAndWhen = styled.div`
display: inline-block;
color: #aaa;
font-size: .8rem;
float: right;
padding: 10px 100px;
`
function WhoAndWhen({...props}){
return <StyledWhoAndWhen {...props}/>

}
export default WhoAndWhen;