import styled from "styled-components";
const StyledWhoAndWhen = styled.div`
display: inline-block;
color: #aaa;
font-size: .8rem;
float: right;
padding: 40px 250px;

  width: 50%; 

`
function WhoAndWhen({...props}){
return <StyledWhoAndWhen {...props}/>

}
export default WhoAndWhen;